const path = require("path");
const fs = require("fs");
const FilenameGenerator = require("../utils/filenameGenerator");

class FileValidator {
  /**
   * Validate file extension
   */
  static validateExtension(filename, allowedExtensions) {
    const ext = path.extname(filename).toLowerCase();
    return allowedExtensions.includes(ext);
  }

  /**
   * Validate MIME type
   */
  static validateMimeType(mimetype, allowedMimeTypes) {
    return allowedMimeTypes.includes(mimetype);
  }

  /**
   * Validate file size
   */
  static validateSize(size, maxSizeMB) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return size <= maxSizeBytes;
  }

  /**
   * Validate file signature (magic number)
   * This is the REAL security check!
   */
  static async validateMagicNumber(filePath, expectedMagicNumbers) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath, { start: 0, end: 3 });
      const chunks = [];

      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const hex = buffer.toString("hex");

        // Check if file starts with any expected magic number
        const isValid = expectedMagicNumbers.some((magic) =>
          hex.startsWith(magic.toLowerCase())
        );

        resolve(isValid);
      });
      stream.on("error", reject);
    });
  }

  /**
   * Sanitize filename to prevent path traversal
   * @deprecated Use FilenameGenerator.sanitize() instead
   */
  static sanitizeFilename(filename) {
    return FilenameGenerator.sanitize(filename);
  }

  /**
   * Generate secure unique filename
   * @deprecated Use FilenameGenerator.withHash() instead
   */
  static generateUniqueFilename(originalName) {
    return FilenameGenerator.withHash(originalName);
  }

  /**
   * Comprehensive file validation
   */
  static async validateFile(file, config) {
    const errors = [];

    // 1. Extension check
    if (!this.validateExtension(file.originalname, config.extensions)) {
      errors.push(
        `Invalid extension. Allowed: ${config.extensions.join(", ")}`
      );
    }

    // 2. MIME type check
    if (!this.validateMimeType(file.mimetype, config.mimeTypes)) {
      errors.push(`Invalid MIME type. Allowed: ${config.mimeTypes.join(", ")}`);
    }

    // 3. Size check
    if (!this.validateSize(file.size, config.maxSize)) {
      errors.push(`File too large. Max size: ${config.maxSize}MB`);
    }

    // 4. Magic number check (if file exists on disk)
    if (file.path && config.magicNumbers) {
      const expectedMagic = config.magicNumbers[file.mimetype];
      if (expectedMagic) {
        const isValid = await this.validateMagicNumber(
          file.path,
          expectedMagic
        );
        if (!isValid) {
          errors.push(
            "File content does not match declared type (magic number mismatch)"
          );
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = FileValidator;
