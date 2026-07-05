const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12;

class PasswordUtil {
    async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new PasswordUtil();