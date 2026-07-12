const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    // --- User Profile Module fields ---
    username: {
      type: String,
      unique: true,
      sparse: true, // allows many users to have username = null before they set one
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: [/^[a-z0-9-]+$/, 'Username can only contain lowercase letters, numbers, and hyphens'],
      default: null,
    },
    bio: {
      type: String,
      maxlength: 300,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    avatarPublicId: {
      // Internal bookkeeping only (local filename or Cloudinary public_id) —
      // used to delete the old avatar file/asset when a new one is uploaded.
      // Never returned by the API.
      type: String,
      default: null,
      select: false,
    },
    isPublicProfile: {
      // Controls whether GET /api/users/:username returns this profile to
      // anyone other than the owner. false = private (owner-only), true = public.
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['unverified', 'active', 'suspended'],
      default: 'unverified',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    // --- Soft delete (Account Actions) ---
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model('User', userSchema);
