const path = require("path");

// Centralized upload configuration
const uploadConfig = {
  // Storage settings
  storage: {
    type: process.env.STORAGE_TYPE || "local", // 'local' | 's3' | 'gcs'
    local: {
      basePath: process.env.UPLOAD_BASE_PATH || "public/upload",
    },
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
      region: process.env.AWS_S3_REGION || "us-east-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },

  // File type configurations
  fileTypes: {
    image: {
      path: "images",
      subfolders: {
        avatar: "avatars", // For user avatars
        product: "products", // For product images
        post: "posts", // For post images
      },
      extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
      mimeTypes: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ],
      maxSize: 5, // MB
      magicNumbers: {
        "image/jpeg": ["ffd8ffe0", "ffd8ffe1", "ffd8ffe2"],
        "image/png": ["89504e47"],
        "image/gif": ["47494638"],
      },
    },
    audio: {
      path: "audios",
      extensions: [".mp3", ".wav", ".flac", ".m4a"],
      mimeTypes: ["audio/mpeg", "audio/wav", "audio/flac", "audio/mp4"],
      maxSize: 10, // MB
      magicNumbers: {
        "audio/mpeg": ["494433", "fffb", "fff3", "fff2"],
      },
    },
    document: {
      path: "documents",
      extensions: [".pdf", ".doc", ".docx", ".txt"],
      mimeTypes: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ],
      maxSize: 20, // MB
      magicNumbers: {
        "application/pdf": ["25504446"],
      },
    },
    video: {
      path: "videos",
      extensions: [".mp4", ".avi", ".mov", ".mkv"],
      mimeTypes: ["video/mp4", "video/x-msvideo", "video/quicktime"],
      maxSize: 100, // MB
      magicNumbers: {
        "video/mp4": ["66747970"],
      },
    },
  },

  // Security settings
  security: {
    checkMagicNumbers: true,
    sanitizeFilename: true,
    virusScan: process.env.ENABLE_VIRUS_SCAN === "true",
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || ["*"],
  },

  // Limits
  limits: {
    maxFilesPerRequest: 10,
    maxTotalSize: 100, // MB
    maxFilenameLength: 100,
  },

  // Cleanup settings
  cleanup: {
    enabled: true,
    orphanedFilesAfter: 24 * 60 * 60 * 1000, // 24 hours
    tempFilesAfter: 1 * 60 * 60 * 1000, // 1 hour
  },
};

module.exports = uploadConfig;
