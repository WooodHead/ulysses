const Bcrypt = require('bcrypt-nodejs');

const crypto = require('crypto');
const saltToUse = 16;

/**
 * Compares two passwords
 *
 * @param password {String} entered password
 * @param currentPassword {String} password that should be used as reference
 * @param cb {Function} callback that gets called with the results
 */
exports.comparePassword = function (password, currentPassword, cb) {
    Bcrypt.compare(password, currentPassword, function (err, matched) {
        if (err) return cb(err, false);
        cb(null, matched);
    });
};

/**
 * Crypts the given password
 *
 * @param password {String} clear text password
 * @param cb {Function} callback with the resulting password
 */
exports.cryptPassword = function (password, cb) {
    const passwd = password;
    Bcrypt.genSalt(saltToUse, function (err, salt) {
        if (err) return cb(err);

        const hashed = Bcrypt.hashSync(passwd, salt, null);
        cb(null, hashed);
    });
};
