const Passport = require('passport');
const PassportConfig = require('../../../auth/LocalPassportHandler');
const PasswordCrypto = require('../../../auth/PasswordCrypt');
const User = require('../../../model/commonModel').user;
const Repository = require('../../../model/commonModel').repository;
const Express = require('express');
const Router = Express.Router();

module.exports = function (passport, csrf, flash) {
    Router.get('/u/:user', function (req, res) {
        User.findUserByUsername(req.params.user, function (err, result) {
            if (result) {
                const user = result;
                Repository.findRepositoryByOwnerId(user.id, function (err, result) {
                    var repo = [{}];
                    if (result) {
                        repo = result.dataValues;
                    }
                    res.render('profile', {user: user, repository: repo});
                });
            } else {
                // Probably better to 404 instead of redirecting
                res.redirect('/');
            }
        });
    });


    Router.get('/signup', function (req, res, next) {
        if (req.user) return res.redirect('/');
        return res.render('signup', {title: 'Sign In'});
    });


    Router.get('/login', function (req, res) {
        if (req.user) return res.redirect('/');
        res.render('login', {title: 'Login'});
    });


    Router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    Router.post('/signup', function (req, res) {
        if (req.user) return res.redirect('/');

        req.assert('email', 'Email must be a valid mail').isEmail();
        req.assert('password', 'Password too short - must be at least 6 characters long').len(6);
        req.assert('confirm', 'Passwords aren\'t equal').equals(req.body.password);

        const errors = req.validationErrors();
        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/signup');
        }

        User.findAll({where: {email: req.body.email}}).then(function (users) {
            if (users.length == 0) {
                PasswordCrypto.cryptPassword(req.body.password, function (err, hashed) {
                    const user = User.create({
                        email: req.body.email,
                        username: req.body.username,
                        name: req.body.name,
                        password: hashed
                    }).then(function (result) {
                        req.login(result.dataValues, function (err) {
                            if (err) console.log(err);

                            res.redirect('/');
                        });
                    }).error(function (err) {
                        console.log('err while creating a new user: ' + err);
                    });
                });
            }
        }).error(function (err) {
            console.log(err);
        });
    });


    Router.post('/login', function (req, res) {
        if (req.user) return res.redirect('/');

        req.assert('email', 'Email must be a valid mail').isEmail();
        req.assert('password', 'Password too short - must be at least 6 characters long').len(6);

        const errors = req.validationErrors();
        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/login');
        }

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (result) {
            if (result) {
                req.login(result.dataValues, function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect('/');
                    }

                    res.redirect('/');
                });
            }
        }).error(function (err) {
            console.log(err);
        });
    });

    return Router;
};
