const UploadMiddleware = require("./uploadMiddleware");
const uploadConfig = require("./config/uploadConfig");
const FilenameGenerator = require("./utils/filenameGenerator");
const FileCleanup = require("./utils/fileCleanup");
const UploadRateLimiter = require("./utils/uploadRateLimiter");
const ImageProcessor = require("./processors/imageProcessor");
const VirusScanner = require("./processors/virusScanner");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const StorageFactory = require("./storage/storageFactory");
const FileValidator = require("./validators/fileValidator");

/**
 * Custom Product Image Upload Middleware
 * Creates folder by product name and generates multiple sizes
 */
const uploadProductImage = (req, res, next) => {
  // Simpler approach: use product ID if available, otherwise use timestamp
  let folderName = "temp-" + Date.now();

  // Try to get product ID from params for update operation
  if (req.params && req.params.id) {
    folderName = `product-${req.params.id}`;
  }

  // Create storage path: public/upload/images/products/{folder-name}
  const productFolder = path.join(
    uploadConfig.storage.local.basePath,
    "images/products",
    folderName
  );

  // Custom storage for this product
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        // Ensure product folder exists
        await fs.mkdir(productFolder, { recursive: true });
        cb(null, productFolder);
      } catch (error) {
        cb(error);
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      // Use folder name as base filename (will be updated after folder rename)
      const filename = `${folderName}${ext}`;
      cb(null, filename);
    },
  });

  // File filter
  const typeConfig = uploadConfig.fileTypes.image;
  const fileFilter = (req, file, cb) => {
    if (
      !FileValidator.validateExtension(file.originalname, typeConfig.extensions)
    ) {
      return cb(
        new Error(
          `Invalid file type. Allowed: ${typeConfig.extensions.join(", ")}`
        ),
        false
      );
    }
    if (!FileValidator.validateMimeType(file.mimetype, typeConfig.mimeTypes)) {
      return cb(
        new Error(
          `Invalid MIME type. Allowed: ${typeConfig.mimeTypes.join(", ")}`
        ),
        false
      );
    }
    cb(null, true);
  };

  // Create multer upload
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: typeConfig.maxSize * 1024 * 1024,
    },
  }).single("image");

  // Execute upload
  upload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new Error(`File too large. Max size is ${typeConfig.maxSize}MB`)
          );
        }
      }
      return next(err);
    }

    // Skip if no file
    if (!req.file) {
      return next();
    }

    try {
      // After upload, rename folder based on product name from form
      if (req.body.name) {
        const newFolderName = req.body.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

        const newProductFolder = path.join(
          uploadConfig.storage.local.basePath,
          "images/products",
          newFolderName
        );

        // Rename folder if different
        if (productFolder !== newProductFolder) {
          try {
            // Get file extension
            const ext = path.extname(req.file.filename);
            const oldFilePath = req.file.path;
            const newFileName = `${newFolderName}${ext}`;

            // Remove new folder if exists
            await fs.rm(newProductFolder, { recursive: true, force: true });

            // Rename temp folder to product name folder
            await fs.rename(productFolder, newProductFolder);

            // Rename the file inside the folder
            const oldFilePathInNewFolder = path.join(
              newProductFolder,
              req.file.filename
            );
            const newFilePath = path.join(newProductFolder, newFileName);

            if (oldFilePathInNewFolder !== newFilePath) {
              await fs.rename(oldFilePathInNewFolder, newFilePath);
            }

            // Update file path in req.file
            req.file.path = newFilePath;
            req.file.filename = newFileName;

            console.log(`✅ Renamed folder: ${folderName} → ${newFolderName}`);

            // Generate thumbnails in new location with product name
            const thumbnailResult = await ImageProcessor.generateThumbnails(
              req.file.path,
              {
                small: { width: 150, height: 150 },
                medium: { width: 300, height: 300 },
                large: { width: 600, height: 600 },
                xlarge: { width: 1200, height: 1200 },
              }
            );

            req.thumbnails = thumbnailResult.thumbnails;

            console.log(`✅ Product images uploaded: ${newFolderName}/`);
            console.log(`   - Original: ${req.file.filename}`);
            Object.keys(req.thumbnails).forEach((size) => {
              console.log(
                `   - ${size}: ${path.basename(req.thumbnails[size].path)}`
              );
            });
          } catch (renameErr) {
            console.error("Error renaming folder:", renameErr);
            // Continue with original folder if rename fails
          }
        }
      } else {
        // No product name, just generate thumbnails
        const thumbnailResult = await ImageProcessor.generateThumbnails(
          req.file.path,
          {
            small: { width: 150, height: 150 },
            medium: { width: 300, height: 300 },
            large: { width: 600, height: 600 },
            xlarge: { width: 1200, height: 1200 },
          }
        );

        req.thumbnails = thumbnailResult.thumbnails;
      }

      next();
    } catch (error) {
      console.error("❌ Error processing product image:", error);
      // Continue even if thumbnail generation fails
      next();
    }
  });
};

// Export clean API
module.exports = {
  // Single file upload
  uploadImage: UploadMiddleware.create("image"),
  uploadAvatar: UploadMiddleware.create("image", {}, "avatars"), // Avatar in avatars subfolder
  uploadProductImage, // Custom product image upload with thumbnails
  uploadAudio: UploadMiddleware.create("audio"),
  uploadDocument: UploadMiddleware.create("document"),
  uploadVideo: UploadMiddleware.create("video"),

  // Multiple files upload
  uploadImages: UploadMiddleware.createMultiple("image", 10),
  uploadAudios: UploadMiddleware.createMultiple("audio", 5),
  uploadDocuments: UploadMiddleware.createMultiple("document", 10),

  // Custom upload with specific config
  createUpload: (fileType, customConfig, subfolder) =>
    UploadMiddleware.create(fileType, customConfig, subfolder),

  // Rate limiters
  rateLimiter: {
    default: () => UploadRateLimiter.create(),
    strict: () => UploadRateLimiter.strict(),
    lenient: () => UploadRateLimiter.lenient(),
    perUser: (options) => UploadRateLimiter.perUser(options),
    custom: (options) => UploadRateLimiter.create(options),
  },

  // Utilities
  utils: {
    FilenameGenerator,
    FileCleanup,
    ImageProcessor,
    VirusScanner,
  },

  // Config access
  config: uploadConfig,
};
