const { z } = require('zod');

const {
    fullName,
    email,
    username,
    password
} = require('../../../shared/validations/common.validation');

const signupSchema = z.object({
    fullName,
    email,
    username,
    password,
}).strict();

module.exports = signupSchema;