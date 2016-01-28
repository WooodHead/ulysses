'use strict';

const Passport = require('passport');

const PasswordCrypto = require('../../auth/password_crypt');
const gravatar = require('gravatar');

const Schema = require('../export');

const User = Schema.user;
const Repository = Schema.repository;

/**
 *
 * @param req {Object}
 * @param res {Object}
 * @param next {Object}
 * @param templateResponse {Boolean}
 * @returns {*}
 */
exports.signUp = function (mail, username, name, pw, cb) {

    // the user table has a primary key on the mail, it should be unique across the table.
    User.findAll(
        {
            where: {
                email: mail
            }
        }).then(function (users) {
            // we search using `findAll`, that should create an Array of users who have the same email.
            if (users.length == 0) {
                PasswordCrypto.cryptPassword(pw, function (err, hashed) {

                    const user = User.create({
                        email: mail,
                        username: username,
                        name: name,
                        password: hashed,
                        avatarUrl: gravatar.url(mail, {s: '100', r: 'x', d: 'retro'}, true)
                    }).then(function (result) {

                        cb(null, false, result);
                    }).error(function (err) {

                        console.log('err while creating a new user: ' + err);
                        cb(err);
                    });
                });
            } else {
                // seems like the user already exists, redirect it
                cb(null, true);
            }
        }).error(function (err) {
            console.log(err);
            cb(err);
        });
};


/**
 *
 * @param req {Object}
 * @param res {Object}
 * @param templateResponse {Boolean}
 */
exports.login = function (req, res, next, templateResponse) {

    if (req.user) {
        return res.redirect('/');
    }

    req.assert('email', 'Email must be a valid mail').isEmail();
    req.assert('password', 'Password too short - must be at least 6 characters long').len(6);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/login');
    }

    Passport.authenticate('local', function (err, user, info) {

        if (err) {
            console.log(err);
            return res.redirect('/');
        }

        req.login(user.dataValues, function (err) {

            if (err) {
                console.log(err);
                return res.redirect('/');
            }

            res.redirect('/');
        });
    })(req, res, next);
};
