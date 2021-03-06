const path = require('path');
const config = require('../../../../config/AppConfig');
const Git = require('nodegit');

const Express = require('express');
const Router = Express.Router();
const commonModel = require('../../../model/export');

const CommonGit = require('../../../model/common/git');
const PermissionValidation = require('../../../auth/permission_validation');

const User = commonModel.user;
const Repository = commonModel.repository;


function existsRepository (repositoryName, ownerId, cb) {

    Repository
        .findOne({
            where: {
                title: repositoryName,
                OwnerId: ownerId
            }
        })
        .then(function (result) {
            cb(null, result);
        })
        .error(function (err) {
            cb(err, null);
        });
}

module.exports = function (passport, csrf, flash) {
    /**
     * Shows the requested repository
     *
     * !!! Requires Permissions !!!
     */
    Router.get('/u/:user/:repo', function (req, res, next) {
        res.render('index');
    });

    /**
     * Creates a new repository
     */
    Router.get('/repositories/u/:user',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner,
        function (req, res, next) {
            res.render('index');
        });


    /**
     * Gets all repositories for this user
     */
    Router.get('/repositories/u/:user',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner,
        function (req, res, next) {
            res.render('index');
        });


    /**
     * Creates a new repository for this user
     */
    Router.post('/repository/new', /* PermissionValidation.isLoggedIn,*/  (req, res, next) => {

        req.assert('name', 'A repository name is required').len(1);

        const errors = req.validationErrors();
        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/repository/new');
        }

        const options = {
            wiki: req.body.wiki,
            visibility: req.body.visibility,
            cloneable: req.body.clone
        };
        const localRepository = new CommonGit(req.user.id,
            req.body.name,
            req.body.description,
            options
        );

        localRepository.create((err, result) => {

            if (err) {

                console.log(err);
                return res.render('/');
            }

            res.redirect('/u/' + req.user.dataValues.name + '/' + req.body.name);
        });
    });


    /**
     * Creates a new repository for this user
     */
    Router.get('/repository/new', /*PermissionValidation.isLoggedIn, */ function (req, res, next) {
        res.render('new');
    });


    /**
     * Deletes the repository
     */
    Router.get('/u/:user/:repository/delete',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner,
        function (req, res, next) {

            res.render('index');
        });


    /**
     * Get the repository settings
     */
    Router.get('/u/:user/:repository/settings',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner,
        function (req, res, next) {

            res.render('index');
        });


    /**
     * Update the repository settings
     */
    Router.post('/u/:user/:repository/settings',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner, function (req, res, next) {

            res.render('index');
        });


    /**
     * Watch the repository
     */
    Router.get('/u/:user/:repository/watch',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner,
        function (req, res, next) {

            res.render('index');
        });


    /**
     * Fav the repository
     */
    Router.get('/u/:user/:repository/fav',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner,
        function (req, res, next) {

            res.render('index');
        });


    /**
     * Adds a new branch
     */
    Router.post('/u/:user/:repository/branch/new',
        PermissionValidation.isLoggedIn,
        PermissionValidation.isOwner,
        function (req, res, next) {
            res.render('index');
        });


    /**
     * Returns all branches
     */
    Router.post('/u/:user/:repository/branches', PermissionValidation.isLoggedIn, function (req, res, next) {
        res.render('index');
    });


    /**
     * Renames the branch-name
     */
    Router.post('/u/:user/:repository/:branch/rename',
        PermissionValidation.isLoggedIn,
        function (req, res, next) {

            res.render('index');
        });


    /**
     * Deletes the branch
     */
    Router.post('/u/:user/:repository/:branch/delete',
        PermissionValidation.isLoggedIn,
        function (req, res, next) {
            res.render('index');
        });


    /**
     * Checks out the given branch
     */
    Router.get('/u/:user/:repository/:branch', PermissionValidation.isLoggedIn, function (req, res, next) {
        res.render('index');
    });


    /**
     * Checks out the given tag
     */
    Router.get('/u/:user/:repository/:tag', PermissionValidation.isLoggedIn, function (req, res, next) {
        res.render('index');
    });


    return Router;
};
