const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const User = require("../models").User;
const { utils, config: uploadConfig } = require("../middlewares/uploads");
const { ImageProcessor, VirusScanner } = utils;

/**
 * Generate public URL from file path
 * Converts: public/upload/images/avatars/file.jpg -> /upload/images/avatars/file.jpg
 */
const getPublicUrl = (filePath) => {
  const publicIndex = filePath.indexOf("public");
  if (publicIndex !== -1) {
    return filePath.substring(publicIndex + 6); // Remove 'public' prefix
  }
  // Fallback: extract from uploads folder
  const parts = filePath.split(path.sep);
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex !== -1) {
    return "/" + parts.slice(uploadIndex).join("/");
  }
  return "/" + filePath;
};

/**
 * Upload single avatar with image processing
 */
const uploadAvatar = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please select an image file.",
      });
    }

    const filePath = req.file.path;

    // Optimize image
    try {
      // Optimize with quality 85, strip metadata for privacy
      await ImageProcessor.optimize(filePath, null, {
        quality: 85,
        stripMetadata: true,
      });

      // Update file size after optimization
      const stats = await fs.stat(filePath);
      req.file.size = stats.size;

      console.log(`✅ Image optimized and saved`);
    } catch (optimizeError) {
      console.warn(`⚠️ Image optimization failed: ${optimizeError.message}`);
      // Continue even if optimization fails
    }

    // Generate thumbnails for responsive display
    let thumbnails = {};
    try {
      const thumbs = await ImageProcessor.generateThumbnails(filePath, [
        { name: "thumb", width: 100, height: 100 }, // Only 1 thumbnail for avatar lists
      ]);

      // Save thumbnails
      for (const thumb of thumbs) {
        const thumbPath = filePath.replace(
          path.extname(filePath),
          `_${thumb.name}${path.extname(filePath)}`
        );
        await fs.writeFile(thumbPath, thumb.buffer);

        thumbnails[thumb.name] = getPublicUrl(thumbPath);
      }

      console.log(
        `✅ Thumbnails generated: ${Object.keys(thumbnails).join(", ")}`
      );
    } catch (thumbError) {
      console.warn(`⚠️ Thumbnail generation failed: ${thumbError.message}`);
      // Continue even if thumbnail generation fails
    }

    // File info
    const fileInfo = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      size: req.file.size,
      sizeKB: (req.file.size / 1024).toFixed(2),
      sizeMB: (req.file.size / (1024 * 1024)).toFixed(2),
      mimetype: req.file.mimetype,
      url: getPublicUrl(filePath),
      thumbnails: thumbnails,
    };

    // Get user from request (if authenticated)
    const { user } = req;
    console.log("📍 User uploading avatar:", user?.email || "anonymous");

    // If user is authenticated, save to database
    if (user && user.email) {
      const userFound = await User.findOne({ where: { email: user.email } });
      if (userFound) {
        await userFound.update({ avatar: fileInfo.url });
        console.log(`✅ Avatar saved to database for user: ${user.email}`);
        console.log(`📸 Avatar URL: ${fileInfo.url}`);
      } else {
        console.warn(`⚠️ User not found in database: ${user.email}`);
      }
    }

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully!",
      file: fileInfo,
      user: user ? { email: user.email } : null,
    });
  } catch (error) {
    console.error("Upload avatar error:", error);

    // Delete file if error occurs
    if (req.file?.path) {
      try {
        if (fsSync.existsSync(req.file.path)) {
          await fs.unlink(req.file.path);
        }

        // Delete thumbnails if they exist
        const thumbPatterns = ["_thumb"];
        for (const pattern of thumbPatterns) {
          const thumbPath = req.file.path.replace(
            path.extname(req.file.path),
            `${pattern}${path.extname(req.file.path)}`
          );
          if (fsSync.existsSync(thumbPath)) {
            await fs.unlink(thumbPath);
          }
        }
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

/**
 * Upload multiple images with processing
 */
const uploadImages = async (req, res) => {
  try {
    // Check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded. Please select image files.",
      });
    }

    const processedFiles = [];
    const errors = [];

    // Process each file
    for (const file of req.files) {
      try {
        const filePath = file.path;

        // Optimize image
        try {
          await ImageProcessor.optimize(filePath, null, {
            quality: 80,
            stripMetadata: true,
          });

          // Update file size
          const stats = await fs.stat(filePath);
          file.size = stats.size;
        } catch (optimizeError) {
          console.warn(
            `⚠️ Optimization failed for ${file.originalname}: ${optimizeError.message}`
          );
        }

        // Generate single thumbnail
        try {
          const thumbs = await ImageProcessor.generateThumbnails(filePath, [
            { name: "thumb", width: 300, height: 300 },
          ]);

          const thumbPath = filePath.replace(
            path.extname(filePath),
            `_thumb${path.extname(filePath)}`
          );
          await fs.writeFile(thumbPath, thumbs[0].buffer);
        } catch (thumbError) {
          console.warn(
            `⚠️ Thumbnail generation failed for ${file.originalname}`
          );
        }

        processedFiles.push({
          originalName: file.originalname,
          fileName: file.filename,
          filePath: file.path,
          size: file.size,
          sizeKB: (file.size / 1024).toFixed(2),
          mimetype: file.mimetype,
          url: getPublicUrl(filePath),
          thumbnail: getPublicUrl(
            filePath.replace(
              path.extname(filePath),
              `_thumb${path.extname(filePath)}`
            )
          ),
        });
      } catch (error) {
        errors.push({
          file: file.originalname,
          error: error.message,
        });

        // Cleanup failed file
        if (fsSync.existsSync(file.path)) {
          await fs.unlink(file.path);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: `${processedFiles.length} image(s) uploaded successfully!`,
      uploaded: processedFiles.length,
      failed: errors.length,
      files: processedFiles,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Upload images error:", error);

    // Delete all files if critical error occurs
    if (req.files) {
      for (const file of req.files) {
        try {
          if (fsSync.existsSync(file.path)) {
            await fs.unlink(file.path);
          }
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      }
    }

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

/**
 * Upload document with virus scan
 */
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please select a document.",
      });
    }

    const filePath = req.file.path;

    // Virus scan if enabled
    if (process.env.ENABLE_VIRUS_SCAN === "true") {
      try {
        const virusScanner = new VirusScanner();
        const buffer = await fs.readFile(filePath);
        const scanResult = await virusScanner.scanBuffer(buffer);

        if (scanResult.error) {
          // Virus scanner unavailable
          if (process.env.STRICT_VIRUS_SCAN === "true") {
            // Strict mode: reject upload
            await fs.unlink(filePath);
            return res.status(503).json({
              success: false,
              message:
                "Virus scan service unavailable. Upload rejected for security.",
              error: scanResult.error,
            });
          } else {
            // Lenient mode: allow with warning
            console.warn(
              `⚠️ Virus scan unavailable, allowing upload: ${req.file.filename}`
            );
          }
        } else if (scanResult.isInfected) {
          // Virus detected
          await fs.unlink(filePath);
          console.error(
            `🦠 Virus detected in ${
              req.file.filename
            }: ${scanResult.viruses.join(", ")}`
          );

          return res.status(400).json({
            success: false,
            message: "Virus detected in uploaded file!",
            viruses: scanResult.viruses,
          });
        } else {
          console.log(`✅ File is clean: ${req.file.filename}`);
        }
      } catch (scanError) {
        console.error("Virus scan error:", scanError);

        if (process.env.STRICT_VIRUS_SCAN === "true") {
          await fs.unlink(filePath);
          return res.status(500).json({
            success: false,
            message: "Virus scan failed. Upload rejected for security.",
            error: scanError.message,
          });
        }
      }
    }

    const fileInfo = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      size: req.file.size,
      sizeKB: (req.file.size / 1024).toFixed(2),
      sizeMB: (req.file.size / (1024 * 1024)).toFixed(2),
      mimetype: req.file.mimetype,
      url: getPublicUrl(filePath),
      scanned: process.env.ENABLE_VIRUS_SCAN === "true",
    };

    // TODO: Save to database
    // const document = await Document.create({ userId: req.user.id, ...fileInfo });

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully!",
      file: fileInfo,
    });
  } catch (error) {
    console.error("Upload document error:", error);

    if (req.file?.path && fsSync.existsSync(req.file.path)) {
      await fs.unlink(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

/**
 * Delete uploaded file
 */
const deleteFile = async (req, res) => {
  try {
    const { fileName } = req.params;
    const { folder = "avatars" } = req.query; // Support different folders

    const filePath = path.join(
      uploadConfig.storage.local.basePath,
      folder,
      fileName
    );

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Delete main file
    await fs.unlink(filePath);
    console.log(`✅ Deleted file: ${filePath}`);

    // Delete thumbnails if they exist
    const thumbnailPatterns = ["_thumb"]; // Only 1 thumbnail pattern
    for (const pattern of thumbnailPatterns) {
      const thumbPath = filePath.replace(
        path.extname(filePath),
        `${pattern}${path.extname(filePath)}`
      );

      try {
        if (fsSync.existsSync(thumbPath)) {
          await fs.unlink(thumbPath);
          console.log(`✅ Deleted thumbnail: ${thumbPath}`);
        }
      } catch (thumbError) {
        console.warn(`⚠️ Could not delete thumbnail: ${thumbPath}`);
      }
    }

    // TODO: Delete from database
    // await File.destroy({ where: { fileName } });

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};

/**
 * Get file metadata
 */
const getFileMetadata = async (req, res) => {
  try {
    const { fileName } = req.params;
    const { folder = "avatars" } = req.query;

    const filePath = path.join(
      uploadConfig.storage.local.basePath,
      folder,
      fileName
    );

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const stats = await fs.stat(filePath);

    // Get image metadata if it's an image
    let imageMetadata = null;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const ext = path.extname(fileName).toLowerCase();

    if (imageExtensions.includes(ext)) {
      try {
        const buffer = await fs.readFile(filePath);
        imageMetadata = await ImageProcessor.getMetadata(buffer);
      } catch (metaError) {
        console.warn(`Could not extract image metadata: ${metaError.message}`);
      }
    }

    res.status(200).json({
      success: true,
      file: {
        name: fileName,
        path: filePath,
        size: stats.size,
        sizeKB: (stats.size / 1024).toFixed(2),
        sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
        created: stats.birthtime,
        modified: stats.mtime,
        extension: ext,
        metadata: imageMetadata,
      },
    });
  } catch (error) {
    console.error("Get file metadata error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get file metadata",
      error: error.message,
    });
  }
};

module.exports = {
  uploadAvatar,
  uploadImages,
  uploadDocument,
  deleteFile,
  getFileMetadata,
};
