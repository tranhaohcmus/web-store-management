const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FileValidator = require("../validators/fileValidator");

class StorageFactory {
  /**
   * Create local disk storage
   */
  static createLocalStorage(uploadPath) {
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueFilename = FileValidator.generateUniqueFilename(
          file.originalname
        );
        cb(null, uniqueFilename);
      },
    });
  }

  /**
   * Create S3 storage (using multer-s3)
   */
  static createS3Storage(s3Config) {
    const AWS = require("aws-sdk");
    const multerS3 = require("multer-s3");

    const s3 = new AWS.S3({
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
      region: s3Config.region,
    });

    return multerS3({
      s3: s3,
      bucket: s3Config.bucket,
      acl: "private",
      metadata: (req, file, cb) => {
        cb(null, {
          fieldName: file.fieldname,
          uploadedBy: req.user?.id || "anonymous",
          uploadedAt: new Date().toISOString(),
        });
      },
      key: (req, file, cb) => {
        const uniqueFilename = FileValidator.generateUniqueFilename(
          file.originalname
        );
        cb(null, uniqueFilename);
      },
    });
  }

  /**
   * Create memory storage (for processing before save)
   */
  static createMemoryStorage() {
    return multer.memoryStorage();
  }

  /**
   * Factory method to create appropriate storage
   */
  static createStorage(storageType, config) {
    switch (storageType) {
      case "local":
        return this.createLocalStorage(config.basePath);
      case "s3":
        return this.createS3Storage(config.s3);
      case "memory":
        return this.createMemoryStorage();
      default:
        throw new Error(`Unsupported storage type: ${storageType}`);
    }
  }
}

module.exports = StorageFactory;
