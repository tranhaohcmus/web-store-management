const express = require("express");
const uploadRouter = express.Router();

const {
  uploadAvatar,
  uploadImages,
  uploadDocument,
  deleteFile,
  getFileMetadata,
} = require("../controllers/upload.controller");

const { authenticate } = require("../middlewares/auth/authenticate");

const {
  uploadAvatar: uploadAvatarMiddleware,
  uploadAudio,
  uploadDocument: uploadDocumentMiddleware,
  uploadImages: uploadImagesMiddleware,
  rateLimiter,
} = require("../middlewares/uploads");

// Upload user avatar
uploadRouter.post(
  "/avatar",
  authenticate,
  rateLimiter.perUser(),
  uploadAvatarMiddleware,
  uploadAvatar
);

// Upload multiple images
uploadRouter.post(
  "/images",
  authenticate,
  rateLimiter.lenient(),
  uploadImagesMiddleware,
  uploadImages
);

// Upload a document
uploadRouter.post(
  "/document",
  authenticate,
  rateLimiter.strict(),
  uploadDocumentMiddleware,
  uploadDocument
);

// Upload audio file
uploadRouter.post(
  "/audio",
  authenticate,
  rateLimiter.lenient(),
  uploadAudio,
  (req, res) => {
    res.json({
      success: true,
      message: "Audio uploaded successfully",
      file: req.file,
    });
  }
);

// Delete a file by fileName
uploadRouter.delete("/:fileName", authenticate, deleteFile);

// Get file metadata by fileName
uploadRouter.get("/:fileName/metadata", authenticate, getFileMetadata);

module.exports = uploadRouter;
