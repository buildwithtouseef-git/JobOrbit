const test = require('node:test');
const assert = require('node:assert/strict');

const signupSchema = require('../src/modules/auth/validations/signup.validation');

test('signup schema rejects unknown fields', () => {
  assert.throws(() => {
    signupSchema.parse({
      fullName: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe',
      password: 'Aa1!aaaa',
      admin: true,
    });
  });
});
