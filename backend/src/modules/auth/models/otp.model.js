const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    otp: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['registration', 'password-reset'],
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

// Automatically delete expired documents
otpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
)

module.exports = mongoose.model('Otp', otpSchema);
