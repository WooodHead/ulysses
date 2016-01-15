const PasswordCrypto = require('../src/auth/password_crypt');

const should = require('should');

describe('Password Crypto', function () {
    this.timeout(999999);

    it('should hash a new password', function (done) {
        PasswordCrypto.cryptPassword('my test password', function (err, hashed) {
            should(err).be.null;
            should(hashed).be.not.null;
            should(hashed).be.not.null;
            should(hashed).be.a.String();
            done();
        });
    });

    it('should compare two (equal) hashed passwords', function (done) {
        const password = 'my test password';
        PasswordCrypto.cryptPassword(password, function (err, hashed) {
            should(err).be.null;
            should(hashed).be.not.null;
            should(hashed).be.not.null;
            should(hashed).be.a.String();

            PasswordCrypto.comparePassword(password, hashed, function (err, match) {
                should(err).be.null;
                should(match).be.not.null;
                should(match).be.a.Boolean();
                should(match).be.equal(true);
                done();
            })
        });
    });

    it('should compare two (non-equal) hashed passwords', function (done) {
        const password = 'my test password';
        PasswordCrypto.cryptPassword(password, function (err, hashed) {
            should(err).be.null;
            should(hashed).be.not.null;
            should(hashed).be.not.null;
            should(hashed).be.a.String();

            PasswordCrypto.comparePassword('my-test-password', hashed, function (err, match) {
                should(err).be.null;
                should(match).be.not.null;
                should(match).be.a.Boolean();
                should(match).be.equal(false);
                done();
            })
        });
    })

});
