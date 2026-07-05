const mongoose = require('mongoose');
const validator = require('validator');
const ROLES = require('../../../shared/constants/roles');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [3, 'Full name must be at least 3 characters.'],
        maxlength: [50, 'Full name cannot exceed 50 characters.'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address.',
        },
    },

    username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
        unique: true,
        lowercase: true,
        minlength: [3, 'Username must be at least 3 characters.'],
        maxlength: [20, 'Username cannot exceed 20 characters.'],
        match: [
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain letters, numbers, and underscores.',
        ],
    },

    password: {
        type: String,
        required: [true, 'Password is required.'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters.'],
        select: false,
    },

    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.JOB_SEEKER,
        required: true,
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    profileImage: {
        type: String,
        default: '',
        validate: {
            validator: function (value) {
                return value === "" || validator.isURL(value);
            },
            message: 'Profile image must be a valid URL.',
        },
    },

    lastLoginAt: {
        type: Date,
        default: null,
    },

    refreshToken: {
        type: String,
        default: null,
        select: false,
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('User', userSchema);