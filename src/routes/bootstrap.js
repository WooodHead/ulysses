const fs = require('fs');
const Express = require('express');
const session = require('express-session');
const Passport = require('passport');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const lusca = require('lusca');
const RedisStore = require('connect-redis')(session);

module.exports = function (env) {
    const cookies = cookieParser();
    const definedSession = session({
        resave: false,
        saveUninitialized: true,
        store: new RedisStore(),
        secret: 'ulysses'
    });

    const passportInitialized = Passport.initialize();
    const passportSession = Passport.session();
    const flashed = flash();

    const csrfSession = lusca({
        csrf: true,
        xframe: 'SAMEORIGIN',
        xssProtection: true
    });
    env.use(cookies);
    env.use(definedSession);
    env.use(passportInitialized);
    env.use(passportSession);
    env.use(csrfSession);

    const views = [];
    fs.readdirSync(__dirname + '/controller').forEach(function (name) {
        const controller = require('./controller/' + name)(passportInitialized, csrfSession, flashed);
        env.use(controller);

        const app = Express();

        views.push(__dirname + '/controller/' + name + '/views');

        app.use(cookies);
        app.use(definedSession);
        app.use(passportInitialized);
        app.use(passportSession);
        app.use(csrfSession);
        app.use(flashed);

        app.use(controller);
        env.use(app);

        console.log('mounted controller ' + name);
    });
    env.set('view engine', 'jade');
    const defViewPath = env.get('views');
    views.push(defViewPath);
    env.set('views', views);
    env.use(flashed);
};
