const fs = require('fs');
const path = require('path');
const env = require('../config/env');

const AVATAR_DIR = path.join(__dirname, '../../uploads/avatars');

// multer's diskStorage already wrote the file to AVATAR_DIR by the time this
// runs (see middleware/upload.middleware.js) — this just builds the public
// URL for it and returns the identifiers we need to store on the User.
async function upload(file) {
  const url = `${env.serverBaseUrl}/uploads/avatars/${file.filename}`;
  return { url, publicId: file.filename };
}

// `publicId` here is just the filename on disk.
async function remove(publicId) {
  if (!publicId) return;
  const filePath = path.join(AVATAR_DIR, publicId);
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    // Ignore "file not found" — nothing to clean up. Log anything else.
    if (err.code !== 'ENOENT') {
      console.error('Failed to delete old avatar file:', err.message);
    }
  }
}

module.exports = { upload, remove, AVATAR_DIR };
