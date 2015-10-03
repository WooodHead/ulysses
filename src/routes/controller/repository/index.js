const Express = require('express');
const Router = Express.Router();
const commonModel = require('../../../model/commonModel');

const PermissionValidation = require('../../../auth/PermissionValidation');

const User = commonModel.user;
const Repository = commonModel.repository;


function existsRepository(repositoryName, ownerId, cb) {
    Repository
        .findOne({
            where: {
                title: repositoryName,
                OwnerId: ownerId
            }
        })
        .then(function (result) {

        })
        .error(function (err) {

        });
}

module.exports = function (passport, csrf, flash) {

    Router.get('/u/:user/:repo', function (req, res, next) {

        res.render('index');
    });


    Router.get('/u/:user/repository/new', PermissionValidation.isLoggedIn, PermissionValidation.isOwner, function (req, res, next) {
        res.render('index');
    });


    Router.post('/u/:user/repository/new', PermissionValidation.isLoggedIn, PermissionValidation.isOwner, function (req, res, next) {
        res.render('index');
    });


    Router.get('/u/:user/:repository/delete', PermissionValidation.isLoggedIn, PermissionValidation.isOwner, function (req, res, next) {
        res.render('index');
    });


    Router.get('/u/:user/:repository/settings', PermissionValidation.isLoggedIn, PermissionValidation.isOwner, function (req, res, next) {
        res.render('index');
    });


    Router.post('/u/:user/:repository/settings', PermissionValidation.isLoggedIn, PermissionValidation.isOwner, function (req, res, next) {
        res.render('index');
    });

    return Router;
};
