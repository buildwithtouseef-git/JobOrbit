const mongoose = require('mongoose');

const LOGIN_ATTEMPT_STATUS = require('../../../shared/constants/loginAttemptStatus');

const loginAttemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        index: true,
    },

    emailTried: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    ipAddress: {
        type: String,
        required: true,
    },

    userAgent: {
        type: String,
        default: "",
    },

    status: {
        type: String,
        enum: Object.values(LOGIN_ATTEMPT_STATUS),
        required: true,
    },

    reason: {
        type: String,
        default: "",
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

loginAttemptSchema.index({ createdAt: -1 });

module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);