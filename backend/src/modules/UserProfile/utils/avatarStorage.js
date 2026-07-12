const env = require('../config/env');
const localStorage = require('./localAvatarStorage');

// Cloudinary requires real credentials to even construct, so only load it
// if the provider is actually set to 'cloudinary'.
function getCloudinaryStorage() {
  return require('./cloudinaryAvatarStorage');
}

// Single entry point the Service layer calls — it doesn't need to know or
// care which provider is active. Switching providers is a one-line .env change:
//   AVATAR_STORAGE_PROVIDER=local        (default, works with zero setup)
//   AVATAR_STORAGE_PROVIDER=cloudinary   (requires CLOUDINARY_* env vars)

async function saveAvatar(file) {
  if (env.avatar.provider === 'cloudinary') {
    return getCloudinaryStorage().upload(file);
  }
  return localStorage.upload(file);
}

async function deleteAvatar(publicId) {
  if (env.avatar.provider === 'cloudinary') {
    return getCloudinaryStorage().remove(publicId);
  }
  return localStorage.remove(publicId);
}

module.exports = { saveAvatar, deleteAvatar };
