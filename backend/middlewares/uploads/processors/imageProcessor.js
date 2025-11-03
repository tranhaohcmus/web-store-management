const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

/**
 * Image Processor
 * Optimizes, resizes, and transforms images
 */

class ImageProcessor {
  /**
   * Optimize image (reduce file size while maintaining quality)
   *
   * @param {string} inputPath - Input file path
   * @param {string} outputPath - Output file path (optional, overwrites input if not provided)
   * @param {object} options - Optimization options
   * @returns {Promise<object>} Processing result
   */
  static async optimize(inputPath, outputPath = null, options = {}) {
    const { quality = 80, progressive = true, stripMetadata = true } = options;

    const output = outputPath || inputPath;
    const ext = path.extname(inputPath).toLowerCase();

    try {
      let processor = sharp(inputPath);

      // Strip metadata (EXIF, etc.) for privacy and size reduction
      if (stripMetadata) {
        processor = processor.rotate(); // Auto-rotate based on EXIF, then strip
      }

      // Format-specific optimization
      switch (ext) {
        case ".jpg":
        case ".jpeg":
          processor = processor.jpeg({
            quality,
            progressive,
            mozjpeg: true, // Use mozjpeg for better compression
          });
          break;

        case ".png":
          processor = processor.png({
            quality,
            compressionLevel: 9,
            progressive,
          });
          break;

        case ".webp":
          processor = processor.webp({
            quality,
          });
          break;

        default:
          console.warn(`⚠️ No optimization for ${ext}`);
      }

      // Get stats before optimization
      const statsBefore = await fs.stat(inputPath);
      const sizeBefore = statsBefore.size;

      // Save optimized image
      await processor.toFile(output);

      // Get stats after optimization
      const statsAfter = await fs.stat(output);
      const sizeAfter = statsAfter.size;

      const reduction = ((sizeBefore - sizeAfter) / sizeBefore) * 100;

      console.log(
        `✅ Optimized ${path.basename(inputPath)}: ${this.formatBytes(
          sizeBefore
        )} → ${this.formatBytes(sizeAfter)} (${reduction.toFixed(
          1
        )}% reduction)`
      );

      return {
        success: true,
        inputPath,
        outputPath: output,
        sizeBefore,
        sizeAfter,
        reduction: reduction.toFixed(1),
      };
    } catch (error) {
      console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
      throw error;
    }
  }

  /**
   * Resize image
   *
   * @param {string} inputPath - Input file path
   * @param {string} outputPath - Output file path
   * @param {object} options - Resize options
   * @returns {Promise<object>} Processing result
   */
  static async resize(inputPath, outputPath, options = {}) {
    const {
      width,
      height,
      fit = "cover", // 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
      position = "center",
      background = { r: 255, g: 255, b: 255, alpha: 1 },
    } = options;

    try {
      await sharp(inputPath)
        .resize({
          width,
          height,
          fit,
          position,
          background,
        })
        .toFile(outputPath);

      console.log(
        `✅ Resized ${path.basename(inputPath)} to ${width}x${height}`
      );

      return {
        success: true,
        inputPath,
        outputPath,
        width,
        height,
      };
    } catch (error) {
      console.error(`❌ Failed to resize ${inputPath}:`, error.message);
      throw error;
    }
  }

  /**
   * Generate multiple thumbnails
   *
   * @param {string} inputPath - Input file path
   * @param {object} sizes - Thumbnail sizes { small: { width, height }, medium: {...}, large: {...} }
   * @returns {Promise<object>} Generated thumbnails
   */

  static async generateThumbnails(inputPath, sizes = {}) {
    const defaultSizes = {
      small: { width: 150, height: 150 },
      medium: { width: 300, height: 300 },
      large: { width: 600, height: 600 },
      ...sizes,
    };

    const ext = path.extname(inputPath);
    const basename = path.basename(inputPath, ext);
    const dirname = path.dirname(inputPath);

    const thumbnails = {};

    for (const [name, dimensions] of Object.entries(defaultSizes)) {
      const outputPath = path.join(dirname, `${basename}_${name}${ext}`);

      try {
        await this.resize(inputPath, outputPath, {
          width: dimensions.width,
          height: dimensions.height,
          fit: "cover",
        });

        thumbnails[name] = {
          path: outputPath,
          width: dimensions.width,
          height: dimensions.height,
        };
      } catch (error) {
        console.error(
          `❌ Failed to generate ${name} thumbnail:`,
          error.message
        );
      }
    }

    return {
      success: true,
      original: inputPath,
      thumbnails,
    };
  }

  /**
   * Convert image format
   *
   * @param {string} inputPath - Input file path
   * @param {string} format - Target format (jpeg, png, webp, avif)
   * @param {object} options - Conversion options
   * @returns {Promise<string>} Output file path
   */
  static async convert(inputPath, format, options = {}) {
    const { quality = 80 } = options;

    const basename = path.basename(inputPath, path.extname(inputPath));
    const dirname = path.dirname(inputPath);
    const outputPath = path.join(dirname, `${basename}.${format}`);

    try {
      let processor = sharp(inputPath);

      switch (format.toLowerCase()) {
        case "jpeg":
        case "jpg":
          processor = processor.jpeg({ quality, progressive: true });
          break;
        case "png":
          processor = processor.png({ quality, compressionLevel: 9 });
          break;
        case "webp":
          processor = processor.webp({ quality });
          break;
        case "avif":
          processor = processor.avif({ quality });
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      await processor.toFile(outputPath);

      console.log(
        `✅ Converted ${path.basename(inputPath)} to ${format.toUpperCase()}`
      );

      return outputPath;
    } catch (error) {
      console.error(`❌ Failed to convert ${inputPath}:`, error.message);
      throw error;
    }
  }

  /**
   * Get image metadata
   *
   * @param {string} filePath - Image file path
   * @returns {Promise<object>} Image metadata
   */
  static async getMetadata(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        format: metadata.format,
        width: metadata.width,
        height: metadata.height,
        space: metadata.space,
        channels: metadata.channels,
        depth: metadata.depth,
        hasAlpha: metadata.hasAlpha,
        orientation: metadata.orientation,
        size: (await fs.stat(filePath)).size,
      };
    } catch (error) {
      console.error(
        `❌ Failed to get metadata for ${filePath}:`,
        error.message
      );
      throw error;
    }
  }

  /**
   * Format bytes to human-readable string
   */
  static formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

module.exports = ImageProcessor;
