const fs = require("fs").promises;
const path = require("path");

/**
 * File Cleanup Utility
 * Handles cleanup of orphaned, temporary, and unused files
 */
class FileCleanup {
  /**
   * Initialize file cleanup with configuration
   *
   * @param {object} config - Cleanup configuration
   * @param {string} config.uploadPath - Base upload directory
   * @param {number} config.orphanedFilesAfter - Time in ms after which orphaned files are deleted (default: 24h)
   * @param {number} config.tempFilesAfter - Time in ms after which temp files are deleted (default: 1h)
   * @param {boolean} config.dryRun - If true, only log what would be deleted (default: false)
   * @param {function} config.logger - Logger function (default: console.log)
   */
  constructor(config = {}) {
    this.uploadPath = config.uploadPath || "uploads";
    this.orphanedFilesAfter = config.orphanedFilesAfter || 24 * 60 * 60 * 1000; // 24 hours
    this.tempFilesAfter = config.tempFilesAfter || 1 * 60 * 60 * 1000; // 1 hour
    this.dryRun = config.dryRun || false;
    this.logger = config.logger || console.log;
    this.fileTracker = config.fileTracker; // Optional: Database tracker
  }

  /**
   * Get file age in milliseconds
   *
   * @param {string} filePath - File path
   * @returns {Promise<number>} Age in milliseconds
   */
  async getFileAge(filePath) {
    const stats = await fs.stat(filePath);
    return Date.now() - stats.mtimeMs;
  }

  /**
   * Check if file is tracked in database
   *
   * @param {string} filename - Filename to check
   * @returns {Promise<boolean>} True if file is tracked
   */
  async isFileTracked(filename) {
    if (!this.fileTracker) {
      return false; // No tracker configured
    }

    try {
      return await this.fileTracker(filename);
    } catch (error) {
      this.logger(
        `Error checking file tracking for ${filename}:`,
        error.message
      );
      return true; // Assume tracked on error to prevent accidental deletion
    }
  }

  /**
   * Delete file safely
   *
   * @param {string} filePath - File path to delete
   * @returns {Promise<boolean>} True if deleted successfully
   */
  async deleteFile(filePath) {
    try {
      if (this.dryRun) {
        this.logger(`[DRY RUN] Would delete: ${filePath}`);
        return true;
      }

      await fs.unlink(filePath);
      this.logger(`✅ Deleted: ${filePath}`);
      return true;
    } catch (error) {
      this.logger(`❌ Failed to delete ${filePath}:`, error.message);
      return false;
    }
  }

  /**
   * Scan directory recursively for files
   *
   * @param {string} directory - Directory to scan
   * @returns {Promise<string[]>} Array of file paths
   */
  async scanDirectory(directory) {
    const files = [];

    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          const subFiles = await this.scanDirectory(fullPath);
          files.push(...subFiles);
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      this.logger(`Error scanning directory ${directory}:`, error.message);
    }

    return files;
  }

  /**
   * Clean up orphaned files (files not tracked in database)
   *
   * @returns {Promise<object>} Cleanup statistics
   */
  async cleanOrphanedFiles() {
    this.logger("🧹 Starting orphaned files cleanup...");

    const stats = {
      scanned: 0,
      deleted: 0,
      kept: 0,
      errors: 0,
      bytesFreed: 0,
    };

    try {
      const files = await this.scanDirectory(this.uploadPath);
      stats.scanned = files.length;

      for (const filePath of files) {
        try {
          // Check file age
          const age = await this.getFileAge(filePath);

          // Only check files older than threshold
          if (age > this.orphanedFilesAfter) {
            const filename = path.basename(filePath);
            const isTracked = await this.isFileTracked(filename);

            if (!isTracked) {
              // Get file size before deletion
              const fileStats = await fs.stat(filePath);
              const fileSize = fileStats.size;

              // Delete orphaned file
              const deleted = await this.deleteFile(filePath);
              if (deleted) {
                stats.deleted++;
                stats.bytesFreed += fileSize;
              } else {
                stats.errors++;
              }
            } else {
              stats.kept++;
            }
          } else {
            stats.kept++;
          }
        } catch (error) {
          this.logger(`Error processing ${filePath}:`, error.message);
          stats.errors++;
        }
      }
    } catch (error) {
      this.logger("Error during orphaned files cleanup:", error.message);
    }

    this.logger("📊 Orphaned files cleanup completed:");
    this.logger(`   - Scanned: ${stats.scanned}`);
    this.logger(`   - Deleted: ${stats.deleted}`);
    this.logger(`   - Kept: ${stats.kept}`);
    this.logger(`   - Errors: ${stats.errors}`);
    this.logger(`   - Space freed: ${this.formatBytes(stats.bytesFreed)}`);

    return stats;
  }

  /**
   * Clean up temporary files
   * Files in temp directory older than threshold
   *
   * @param {string} tempDirectory - Temporary directory path
   * @returns {Promise<object>} Cleanup statistics
   */
  async cleanTempFiles(tempDirectory = "/tmp/uploads") {
    this.logger("🧹 Starting temporary files cleanup...");

    const stats = {
      scanned: 0,
      deleted: 0,
      errors: 0,
      bytesFreed: 0,
    };

    try {
      // Check if temp directory exists
      try {
        await fs.access(tempDirectory);
      } catch {
        this.logger(
          `Temp directory ${tempDirectory} does not exist. Skipping.`
        );
        return stats;
      }

      const files = await this.scanDirectory(tempDirectory);
      stats.scanned = files.length;

      for (const filePath of files) {
        try {
          const age = await this.getFileAge(filePath);

          if (age > this.tempFilesAfter) {
            // Get file size before deletion
            const fileStats = await fs.stat(filePath);
            const fileSize = fileStats.size;

            const deleted = await this.deleteFile(filePath);
            if (deleted) {
              stats.deleted++;
              stats.bytesFreed += fileSize;
            } else {
              stats.errors++;
            }
          }
        } catch (error) {
          this.logger(`Error processing temp file ${filePath}:`, error.message);
          stats.errors++;
        }
      }
    } catch (error) {
      this.logger("Error during temp files cleanup:", error.message);
    }

    this.logger("📊 Temporary files cleanup completed:");
    this.logger(`   - Scanned: ${stats.scanned}`);
    this.logger(`   - Deleted: ${stats.deleted}`);
    this.logger(`   - Errors: ${stats.errors}`);
    this.logger(`   - Space freed: ${this.formatBytes(stats.bytesFreed)}`);

    return stats;
  }

  /**
   * Clean up empty directories
   *
   * @param {string} directory - Directory to clean
   * @returns {Promise<number>} Number of directories removed
   */
  async cleanEmptyDirectories(directory = this.uploadPath) {
    let removed = 0;

    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });

      // Recursively clean subdirectories first
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const subDir = path.join(directory, entry.name);
          removed += await this.cleanEmptyDirectories(subDir);
        }
      }

      // Check if current directory is empty
      const currentEntries = await fs.readdir(directory);
      if (currentEntries.length === 0 && directory !== this.uploadPath) {
        if (this.dryRun) {
          this.logger(`[DRY RUN] Would remove empty directory: ${directory}`);
        } else {
          await fs.rmdir(directory);
          this.logger(`✅ Removed empty directory: ${directory}`);
        }
        removed++;
      }
    } catch (error) {
      this.logger(`Error cleaning directory ${directory}:`, error.message);
    }

    return removed;
  }

  /**
   * Clean files by pattern (e.g., *.tmp, *.log)
   *
   * @param {RegExp} pattern - File pattern to match
   * @param {string} directory - Directory to search (default: uploadPath)
   * @returns {Promise<object>} Cleanup statistics
   */
  async cleanByPattern(pattern, directory = this.uploadPath) {
    this.logger(`🧹 Cleaning files matching pattern: ${pattern}`);

    const stats = {
      scanned: 0,
      deleted: 0,
      errors: 0,
      bytesFreed: 0,
    };

    try {
      const files = await this.scanDirectory(directory);
      stats.scanned = files.length;

      for (const filePath of files) {
        const filename = path.basename(filePath);

        if (pattern.test(filename)) {
          try {
            const fileStats = await fs.stat(filePath);
            const fileSize = fileStats.size;

            const deleted = await this.deleteFile(filePath);
            if (deleted) {
              stats.deleted++;
              stats.bytesFreed += fileSize;
            } else {
              stats.errors++;
            }
          } catch (error) {
            this.logger(`Error deleting ${filePath}:`, error.message);
            stats.errors++;
          }
        }
      }
    } catch (error) {
      this.logger("Error during pattern cleanup:", error.message);
    }

    this.logger("📊 Pattern cleanup completed:");
    this.logger(`   - Scanned: ${stats.scanned}`);
    this.logger(`   - Deleted: ${stats.deleted}`);
    this.logger(`   - Errors: ${stats.errors}`);
    this.logger(`   - Space freed: ${this.formatBytes(stats.bytesFreed)}`);

    return stats;
  }

  /**
   * Clean files older than specified age
   *
   * @param {number} maxAge - Maximum age in milliseconds
   * @param {string} directory - Directory to clean (default: uploadPath)
   * @returns {Promise<object>} Cleanup statistics
   */
  async cleanOldFiles(maxAge, directory = this.uploadPath) {
    this.logger(
      `🧹 Cleaning files older than ${this.formatDuration(maxAge)}...`
    );

    const stats = {
      scanned: 0,
      deleted: 0,
      kept: 0,
      errors: 0,
      bytesFreed: 0,
    };

    try {
      const files = await this.scanDirectory(directory);
      stats.scanned = files.length;

      for (const filePath of files) {
        try {
          const age = await this.getFileAge(filePath);

          if (age > maxAge) {
            const fileStats = await fs.stat(filePath);
            const fileSize = fileStats.size;

            const deleted = await this.deleteFile(filePath);
            if (deleted) {
              stats.deleted++;
              stats.bytesFreed += fileSize;
            } else {
              stats.errors++;
            }
          } else {
            stats.kept++;
          }
        } catch (error) {
          this.logger(`Error processing ${filePath}:`, error.message);
          stats.errors++;
        }
      }
    } catch (error) {
      this.logger("Error during old files cleanup:", error.message);
    }

    this.logger("📊 Old files cleanup completed:");
    this.logger(`   - Scanned: ${stats.scanned}`);
    this.logger(`   - Deleted: ${stats.deleted}`);
    this.logger(`   - Kept: ${stats.kept}`);
    this.logger(`   - Errors: ${stats.errors}`);
    this.logger(`   - Space freed: ${this.formatBytes(stats.bytesFreed)}`);

    return stats;
  }

  /**
   * Get storage statistics
   *
   * @param {string} directory - Directory to analyze (default: uploadPath)
   * @returns {Promise<object>} Storage statistics
   */
  async getStorageStats(directory = this.uploadPath) {
    const stats = {
      totalFiles: 0,
      totalSize: 0,
      filesByType: {},
      largestFiles: [],
    };

    try {
      const files = await this.scanDirectory(directory);
      stats.totalFiles = files.length;

      const fileSizes = [];

      for (const filePath of files) {
        try {
          const fileStats = await fs.stat(filePath);
          const ext = path.extname(filePath).toLowerCase();

          stats.totalSize += fileStats.size;

          // Count by type
          if (!stats.filesByType[ext]) {
            stats.filesByType[ext] = { count: 0, size: 0 };
          }
          stats.filesByType[ext].count++;
          stats.filesByType[ext].size += fileStats.size;

          // Track for largest files
          fileSizes.push({
            path: filePath,
            size: fileStats.size,
          });
        } catch (error) {
          // Skip files that can't be accessed
        }
      }

      // Get top 10 largest files
      stats.largestFiles = fileSizes
        .sort((a, b) => b.size - a.size)
        .slice(0, 10)
        .map((f) => ({
          path: f.path,
          size: this.formatBytes(f.size),
        }));
    } catch (error) {
      this.logger("Error getting storage stats:", error.message);
    }

    return stats;
  }

  /**
   * Run full cleanup (all cleanup types)
   *
   * @returns {Promise<object>} Combined cleanup statistics
   */
  async runFullCleanup() {
    this.logger("🚀 Starting full cleanup...\n");

    const results = {
      orphaned: await this.cleanOrphanedFiles(),
      temp: await this.cleanTempFiles(),
      emptyDirs: await this.cleanEmptyDirectories(),
    };

    this.logger("\n✅ Full cleanup completed!");

    return results;
  }

  /**
   * Schedule periodic cleanup
   *
   * @param {number} interval - Cleanup interval in milliseconds
   * @returns {NodeJS.Timeout} Timer ID
   */
  scheduleCleanup(interval = 24 * 60 * 60 * 1000) {
    this.logger(`⏰ Scheduled cleanup every ${this.formatDuration(interval)}`);

    return setInterval(async () => {
      this.logger("\n⏰ Running scheduled cleanup...");
      await this.runFullCleanup();
    }, interval);
  }

  /**
   * Format bytes to human-readable string
   *
   * @param {number} bytes - Bytes
   * @returns {string} Formatted string
   */
  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Format duration to human-readable string
   *
   * @param {number} ms - Duration in milliseconds
   * @returns {string} Formatted string
   */
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day(s)`;
    if (hours > 0) return `${hours} hour(s)`;
    if (minutes > 0) return `${minutes} minute(s)`;
    return `${seconds} second(s)`;
  }
}

module.exports = FileCleanup;
