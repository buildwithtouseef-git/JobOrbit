const multer = require('multer');
const path = require('path');
const env = require('../config/env');
const { AVATAR_DIR } = require('../utils/localAvatarStorage');
const AppError = require('../utils/appError');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// --- Storage engine ---
// local  -> write straight to disk (uploads/avatars), then just build a URL.
// cloudinary -> keep the file in memory as a buffer, stream it to Cloudinary,
//               never touch local disk.
const storage =
  env.avatar.provider === 'cloudinary'
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (req, file, cb) => cb(null, AVATAR_DIR),
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname).toLowerCase();
          const uniqueName = `${req.user.user_id}-${Date.now()}${ext}`;
          cb(null, uniqueName);
        },
      });

// --- Image validation ---
function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new AppError('Avatar must be a JPEG, PNG, or WEBP image', 400, 'INVALID_IMAGE_TYPE'));
  }
  cb(null, true);
}

const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.avatar.maxSizeMb * 1024 * 1024,
  },
}).single('avatar'); // form field name must be "avatar"

// Wraps multer's callback-style middleware so file-size/type errors flow into
// our standard error handler instead of crashing or returning multer's raw format.
function handleAvatarUpload(req, res, next) {
  uploadAvatar(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(
          new AppError(`Avatar must be smaller than ${env.avatar.maxSizeMb}MB`, 400, 'FILE_TOO_LARGE')
        );
      }
      return next(new AppError(err.message, 400, 'UPLOAD_ERROR'));
    }
    if (err) return next(err);

    if (!req.file) {
      return next(new AppError('No avatar file was uploaded', 400, 'NO_FILE'));
    }
    next();
  });
}

module.exports = handleAvatarUpload;
