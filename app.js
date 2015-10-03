const Express = require('express');
const app = Express();

const cookieParser = require('cookie-parser');
const compress = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const logger = require('morgan');

const methodOverride = require('method-override');

const flash = require('express-flash');
const validator = require('express-validator');
const PassportConfig = require('./src/auth/LocalPassportHandler');
const Passport = require('passport');


const path = require('path');


// Init schema
// WARNING: Forced sync => drop table!
require('./src/model/bootstrap').sequelize.sync({force: true}).then(function (result) {
    const models = result.models;
    models.repositories.indexes();
    models.users.indexes();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', 3000);

// middleware
app.use(logger('dev'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
app.use(methodOverride());
app.use(cookieParser());
app.use(flash());

app.use(Express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

require('./src/routes/bootstrap')(app);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', 3000);

module.exports = app;
