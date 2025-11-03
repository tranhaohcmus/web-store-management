const path = require("path");
const crypto = require("crypto");

/**
 * Filename Generator Utility
 * Provides secure, unique, and sanitized filename generation
 */
class FilenameGenerator {
  /**
   * Sanitize filename to prevent security issues
   * - Remove path traversal characters (../, ..\)
   * - Remove null bytes
   * - Remove special characters that can cause issues
   * - Limit filename length
   *
   * @param {string} filename - Original filename
   * @returns {string} Sanitized filename
   */
  static sanitize(filename) {
    if (!filename || typeof filename !== "string") {
      throw new Error("Invalid filename");
    }

    // Remove path separators (prevent directory traversal)
    let sanitized = filename.replace(/[/\\]/g, "");

    // Remove null bytes (security risk)
    sanitized = sanitized.replace(/\0/g, "");

    // Remove special characters that can cause issues
    // Keep: alphanumeric, dots, dashes, underscores
    sanitized = sanitized.replace(/[<>:"|?*]/g, "");

    // Remove leading/trailing dots and spaces
    sanitized = sanitized.trim().replace(/^\.+/, "");

    // Decode any URL encoding
    try {
      sanitized = decodeURIComponent(sanitized);
    } catch (e) {
      // If decoding fails, keep original
    }

    // Handle filename length
    const maxLength = 100;
    if (sanitized.length > maxLength) {
      const ext = path.extname(sanitized);
      const base = path.basename(sanitized, ext);
      const truncatedBase = base.substring(0, maxLength - ext.length - 1);
      sanitized = truncatedBase + ext;
    }

    // Ensure filename is not empty
    if (!sanitized) {
      sanitized = "file";
    }

    return sanitized;
  }

  /**
   * Generate unique filename using timestamp
   * Format: basename-timestamp.ext
   *
   * @param {string} originalName - Original filename
   * @returns {string} Unique filename with timestamp
   */
  static withTimestamp(originalName) {
    const sanitized = this.sanitize(originalName);
    const ext = path.extname(sanitized);
    const base = path.basename(sanitized, ext);
    const timestamp = Date.now();

    return `${base}-${timestamp}${ext}`;
  }

  /**
   * Generate unique filename using UUID
   * Format: basename-uuid.ext
   *
   * @param {string} originalName - Original filename
   * @returns {string} Unique filename with UUID
   */
  static withUUID(originalName) {
    const sanitized = this.sanitize(originalName);
    const ext = path.extname(sanitized);
    const base = path.basename(sanitized, ext);
    const uuid = crypto.randomUUID();

    return `${base}-${uuid}${ext}`;
  }

  /**
   * Generate unique filename using hash
   * Format: basename-timestamp-hash.ext
   *
   * @param {string} originalName - Original filename
   * @param {object} options - Generation options
   * @param {string} options.algorithm - Hash algorithm (default: md5)
   * @param {number} options.hashLength - Hash length (default: 8)
   * @returns {string} Unique filename with hash
   */
  static withHash(originalName, options = {}) {
    const { algorithm = "md5", hashLength = 8 } = options;

    const sanitized = this.sanitize(originalName);
    const ext = path.extname(sanitized);
    const base = path.basename(sanitized, ext);
    const timestamp = Date.now();
    const random = crypto.randomBytes(16).toString("hex");

    // Create hash from base + timestamp + random
    const hash = crypto
      .createHash(algorithm)
      .update(`${base}-${timestamp}-${random}`)
      .digest("hex")
      .substring(0, hashLength);

    return `${base}-${timestamp}-${hash}${ext}`;
  }

  /**
   * Generate secure random filename (no original name preserved)
   * Format: hash.ext
   * Useful for sensitive files where original name should not be revealed
   *
   * @param {string} originalName - Original filename (only extension is used)
   * @param {number} length - Hash length (default: 32)
   * @returns {string} Random filename
   */
  static random(originalName, length = 32) {
    const ext = path.extname(originalName);
    const randomHash = crypto
      .randomBytes(length)
      .toString("hex")
      .substring(0, length);

    return `${randomHash}${ext}`;
  }

  /**
   * Generate filename with user ID prefix
   * Format: userId-basename-timestamp.ext
   * Useful for organizing files by user
   *
   * @param {string|number} userId - User ID
   * @param {string} originalName - Original filename
   * @returns {string} Filename with user prefix
   */
  static withUserPrefix(userId, originalName) {
    const sanitized = this.sanitize(originalName);
    const ext = path.extname(sanitized);
    const base = path.basename(sanitized, ext);
    const timestamp = Date.now();

    return `user${userId}-${base}-${timestamp}${ext}`;
  }

  /**
   * Generate filename with date-based folder structure
   * Format: YYYY/MM/DD/basename-timestamp.ext
   * Returns object with folder path and filename
   *
   * @param {string} originalName - Original filename
   * @returns {object} { folder: 'YYYY/MM/DD', filename: 'basename-timestamp.ext', fullPath: 'YYYY/MM/DD/basename-timestamp.ext' }
   */
  static withDateFolder(originalName) {
    const sanitized = this.sanitize(originalName);
    const ext = path.extname(sanitized);
    const base = path.basename(sanitized, ext);
    const timestamp = Date.now();
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const folder = `${year}/${month}/${day}`;
    const filename = `${base}-${timestamp}${ext}`;
    const fullPath = `${folder}/${filename}`;

    return {
      folder,
      filename,
      fullPath,
    };
  }

  /**
   * Generate slug-friendly filename
   * Converts spaces and special chars to hyphens
   *
   * @param {string} originalName - Original filename
   * @returns {string} Slug filename
   */
  static toSlug(originalName) {
    const sanitized = this.sanitize(originalName);
    const ext = path.extname(sanitized);
    const base = path.basename(sanitized, ext);

    // Convert to lowercase
    let slug = base.toLowerCase();

    // Replace spaces and underscores with hyphens
    slug = slug.replace(/[\s_]+/g, "-");

    // Remove multiple consecutive hyphens
    slug = slug.replace(/-+/g, "-");

    // Remove leading/trailing hyphens
    slug = slug.replace(/^-+|-+$/g, "");

    const timestamp = Date.now();
    return `${slug}-${timestamp}${ext}`;
  }

  /**
   * Generate filename with custom format
   * Supports placeholders:
   * - {name} - original basename
   * - {timestamp} - current timestamp
   * - {date} - YYYYMMDD
   * - {time} - HHMMSS
   * - {random} - random string (8 chars)
   * - {hash} - hash (8 chars)
   * - {uuid} - UUID v4
   * - {ext} - file extension
   *
   * @param {string} originalName - Original filename
   * @param {string} format - Format string (e.g., "{name}-{timestamp}{ext}")
   * @returns {string} Formatted filename
   */
  static custom(originalName, format) {
    const sanitized = this.sanitize(originalName);
    const ext = path.extname(sanitized);
    const base = path.basename(sanitized, ext);
    const timestamp = Date.now();
    const date = new Date();

    const replacements = {
      "{name}": base,
      "{timestamp}": timestamp,
      "{date}": date.toISOString().split("T")[0].replace(/-/g, ""),
      "{time}": date.toTimeString().split(" ")[0].replace(/:/g, ""),
      "{random}": crypto.randomBytes(4).toString("hex"),
      "{hash}": crypto
        .createHash("md5")
        .update(`${base}-${timestamp}`)
        .digest("hex")
        .substring(0, 8),
      "{uuid}": crypto.randomUUID(),
      "{ext}": ext,
    };

    let result = format;
    Object.entries(replacements).forEach(([placeholder, value]) => {
      result = result.replace(new RegExp(placeholder, "g"), value);
    });

    return result;
  }

  /**
   * Validate filename
   *
   * @param {string} filename - Filename to validate
   * @returns {object} { isValid: boolean, errors: string[] }
   */
  static validate(filename) {
    const errors = [];

    // Check if filename is empty
    if (!filename || filename.trim() === "") {
      errors.push("Filename cannot be empty");
    }

    // Check for path traversal
    if (filename.includes("../") || filename.includes("..\\")) {
      errors.push("Filename contains path traversal characters");
    }

    // Check for null bytes
    if (filename.includes("\0")) {
      errors.push("Filename contains null bytes");
    }

    // Check for dangerous characters
    if (/[<>:"|?*]/.test(filename)) {
      errors.push("Filename contains forbidden characters");
    }

    // Check length
    if (filename.length > 255) {
      errors.push("Filename is too long (max 255 characters)");
    }

    // Check for reserved names (Windows)
    const reservedNames = [
      "CON",
      "PRN",
      "AUX",
      "NUL",
      "COM1",
      "COM2",
      "COM3",
      "COM4",
      "COM5",
      "COM6",
      "COM7",
      "COM8",
      "COM9",
      "LPT1",
      "LPT2",
      "LPT3",
      "LPT4",
      "LPT5",
      "LPT6",
      "LPT7",
      "LPT8",
      "LPT9",
    ];
    const basename = path
      .basename(filename, path.extname(filename))
      .toUpperCase();
    if (reservedNames.includes(basename)) {
      errors.push("Filename is a reserved system name");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get file info from filename
   *
   * @param {string} filename - Filename
   * @returns {object} { basename, extension, name, fullname }
   */
  static getInfo(filename) {
    return {
      fullname: filename,
      basename: path.basename(filename, path.extname(filename)),
      extension: path.extname(filename),
      name: path.basename(filename),
      dirname: path.dirname(filename),
    };
  }
}

module.exports = FilenameGenerator;
