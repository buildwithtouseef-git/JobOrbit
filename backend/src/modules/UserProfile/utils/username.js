// Rules kept in one place so the validator, the controller, and any future
// "suggest a username" feature all agree on what a valid username looks like.

const USERNAME_REGEX = /^[a-z0-9-]+$/;
const MIN_LENGTH = 3;
const MAX_LENGTH = 30;

function isValidUsername(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  return v.length >= MIN_LENGTH && v.length <= MAX_LENGTH && USERNAME_REGEX.test(v);
}

// Turns "Ali Raza!!" into "ali-raza" — used if you later want to auto-suggest
// a username from the user's full name during onboarding.
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_LENGTH);
}

module.exports = { isValidUsername, slugify, USERNAME_REGEX, MIN_LENGTH, MAX_LENGTH };
