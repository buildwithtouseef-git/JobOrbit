const { z } = require("zod");

const fullName = z
    .string()
    .trim()
    .min(3, 'Full name must be at least 3 characters.')
    .max(50, 'Full name cannot exceed 50 characters.');

const email = z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address.');

const username = z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters.')
    .max(20, 'Username cannot exceed 20 characters.')
    .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores.'
    );

const password = z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(32, 'Password cannot exceed 32 characters.')
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    );

module.exports = {
    fullName,
    email,
    username,
    password,
};