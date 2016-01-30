'use strict';

const fs = require('fs');
const Express = require('express');
const session = require('express-session');
const Passport = require('passport');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);

const PassportConfig = require('../auth/local_passporthandler');
const env = require('../util/env');

const config = require('../../config/AppConfig');
const lusca = require('lusca');

module.exports = function (env) {

    const cookies = cookieParser();
    const definedSession = session({
        resave: false,
        saveUninitialized: true,
        store: new RedisStore(),
        secret: config.app.connection.security.cookieSecret
    });

    const passportInitialized = Passport.initialize();
    const passportSession = Passport.session();
    const flashed = flash();

    env.use(cookies);
    env.use(definedSession);
    env.use(passportInitialized);
    env.use(passportSession);

    const csrfSession = lusca({
        csrf: true,
        xframe: 'SAMEORIGIN',
        xssProtection: true
    });
    env.use(csrfSession);


    env.use(flashed);


    const views = [];
    fs.readdirSync(__dirname + '/controller').forEach(function (name) {

        const controller = require('./controller/' + name)();
        const app = Express();

        const viewDir = __dirname + '/controller/' + name + '/views';
        app.set('view engine', 'jade');
        app.set('views', viewDir);
        app.use(cookies);
        app.use(definedSession);
        app.use(passportInitialized);
        app.use(passportSession);
        app.use(csrfSession);

        app.use(flashed);

        app.use(function (req, res, next) {
            if (req.user !== undefined) {
                res.locals.user = req.user.dataValues;
            }
            next();
        });

        app.use(controller);
        env.use(app);

        console.log('mounted controller ' + name);
    });


    env.use(function (req, res, next) {

        res.locals.user = req.user;
        next();
    });
};
