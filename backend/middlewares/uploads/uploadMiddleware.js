const multer = require("multer");
const StorageFactory = require("./storage/storageFactory");
const FileValidator = require("./validators/fileValidator");
const uploadConfig = require("./config/uploadConfig");

class UploadMiddleware {
  /**
   * Create upload middleware for specific file type
   * @param {string} fileType - Type of file (image, audio, document, video)
   * @param {object} customConfig - Custom configuration
   * @param {string} subfolder - Optional subfolder (e.g., 'avatar', 'product')
   * @param {string} fieldName - Form field name (default: 'file')
   */
  static create(
    fileType,
    customConfig = {},
    subfolder = null,
    fieldName = "file"
  ) {
    // Get config for this file type
    const typeConfig = uploadConfig.fileTypes[fileType];
    if (!typeConfig) {
      throw new Error(`Unknown file type: ${fileType}`);
    }

    // Merge with custom config
    const config = { ...typeConfig, ...customConfig };

    // Build upload path with optional subfolder
    let uploadPath = `${uploadConfig.storage.local.basePath}/${config.path}`;
    if (subfolder) {
      uploadPath = `${uploadPath}/${subfolder}`;
    }

    const storage = StorageFactory.createStorage(uploadConfig.storage.type, {
      basePath: uploadPath,
      ...uploadConfig.storage,
    });

    // File filter
    const fileFilter = (req, file, cb) => {
      // Extension check
      if (
        !FileValidator.validateExtension(file.originalname, config.extensions)
      ) {
        return cb(
          new Error(
            `Invalid file type. Allowed extensions: ${config.extensions.join(
              ", "
            )}`
          ),
          false
        );
      }

      // MIME type check
      if (!FileValidator.validateMimeType(file.mimetype, config.mimeTypes)) {
        return cb(
          new Error(
            `Invalid MIME type. Allowed types: ${config.mimeTypes.join(", ")}`
          ),
          false
        );
      }

      cb(null, true);
    };

    // Create multer instance
    const upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: config.maxSize * 1024 * 1024,
        files: uploadConfig.limits.maxFilesPerRequest,
      },
    });

    // Return middleware with post-processing
    return (req, res, next) => {
      const multerMiddleware = upload.single(fieldName);

      multerMiddleware(req, res, async (err) => {
        // Handle multer errors
        if (err) {
          // Cleanup uploaded file if exists
          if (req.file && req.file.path) {
            try {
              const fs = require("fs");
              if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
              }
            } catch (cleanupError) {
              console.error("Error cleaning up file:", cleanupError);
            }
          }

          // Format error message
          if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
              return next(
                new Error(`File too large. Maximum size is ${config.maxSize}MB`)
              );
            }
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
              return next(new Error("Unexpected field name"));
            }
          }

          return next(err);
        }

        // Skip validation if no file uploaded
        if (!req.file) {
          return next();
        }

        // Post-upload validation (magic number check)
        if (uploadConfig.security.checkMagicNumbers) {
          try {
            const validation = await FileValidator.validateFile(
              req.file,
              config
            );

            if (!validation.isValid) {
              // Delete invalid file
              const fs = require("fs");
              if (req.file.path && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
              }

              const error = new Error(validation.errors.join(", "));
              error.status = 400;
              return next(error);
            }
          } catch (error) {
            // Cleanup on validation error
            const fs = require("fs");
            if (req.file.path && fs.existsSync(req.file.path)) {
              fs.unlinkSync(req.file.path);
            }
            return next(error);
          }
        }

        next();
      });
    };
  }

  /**
   * Create middleware for multiple file types
   */
  static createMultiple(fileType, maxCount = 10) {
    const typeConfig = uploadConfig.fileTypes[fileType];
    if (!typeConfig) {
      throw new Error(`Unknown file type: ${fileType}`);
    }

    const uploadPath = `${uploadConfig.storage.local.basePath}/${typeConfig.path}`;
    const storage = StorageFactory.createStorage(uploadConfig.storage.type, {
      basePath: uploadPath,
      ...uploadConfig.storage,
    });

    const fileFilter = (req, file, cb) => {
      if (
        !FileValidator.validateExtension(
          file.originalname,
          typeConfig.extensions
        )
      ) {
        return cb(new Error(`Invalid file type`), false);
      }
      if (
        !FileValidator.validateMimeType(file.mimetype, typeConfig.mimeTypes)
      ) {
        return cb(new Error(`Invalid MIME type`), false);
      }
      cb(null, true);
    };

    return multer({
      storage,
      fileFilter,
      limits: {
        fileSize: typeConfig.maxSize * 1024 * 1024,
        files: maxCount,
      },
    }).array("files", maxCount);
  }
}

module.exports = UploadMiddleware;
