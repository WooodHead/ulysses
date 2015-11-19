'use strict';

const PasswordCrypto = require('../../auth/passwordcrypt');
const gravatar = require('gravatar');

const Schema = require('../export');

const User = Schema.user;
const Repository = Schema.repository;

/**
 *
 * @param req {Object}
 * @param res {Object}
 * @param templateResponse {Boolean}
 * @returns {*}
 */
exports.signUp = function (req, res, templateResponse) {

    if (req.user) {
        return res.redirect('/');
    }

    req.assert('email', 'Email must be a valid mail').isEmail();
    req.assert('password', 'Password too short - must be at least 6 characters long').len(6);
    req.assert('confirm', 'Passwords aren\'t equal').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/signup');
    }

    // the user table has a primary key on the mail, it should be unique across the table.
    User.findAll(
        {
            where: {
                email: req.body.email
            }
        }).then(function (users) {
            // we search using `findAll`, that should create an Array of users who have the same email.
            if (users.length == 0) {
                PasswordCrypto.cryptPassword(req.body.password, function (err, hashed) {

                    const user = User.create({
                        email: req.body.email,
                        username: req.body.username,
                        name: req.body.name,
                        password: hashed,
                        avatarUrl: gravatar.url(req.body.email, {s: '100', r: 'x', d: 'retro'}, true)
                    }).then(function (result) {

                        req.login(result.dataValues, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            res.redirect('/');
                        });
                    }).error(function (err) {

                        console.log('err while creating a new user: ' + err);
                    });
                });
            } else {
                // seems like the user already exists, redirect it
                return res.redirect('/signup');
            }
        }).error(function (err) {

            console.log(err);
        });
};


/**
 *
 * @param req {Object}
 * @param res {Object}
 * @param templateResponse {Boolean}
 */
exports.login = function (req, res, templateResponse) {

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
