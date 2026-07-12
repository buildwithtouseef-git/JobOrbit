const cloudinary = require('cloudinary').v2;
const env = require('../config/env');

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

// When AVATAR_STORAGE_PROVIDER=cloudinary, multer uses memoryStorage (see
// upload.middleware.js), so `file.buffer` holds the raw image bytes here —
// nothing is written to local disk in this mode.
function upload(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'job-journey/avatars', resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(file.buffer);
  });
}

// `publicId` here is the Cloudinary public_id returned at upload time.
async function remove(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Failed to delete old avatar from Cloudinary:', err.message);
  }
}

module.exports = { upload, remove };
