const Express = require('express');
const router = Express.Router();

module.exports = function (passport, csrf, app) {

    router.get('/', function (req, res) {

        res.render('index', {title: 'Ulysses'});
    });

    return router;
};

