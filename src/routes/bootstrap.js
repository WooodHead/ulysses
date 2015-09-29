const fs = require('fs');
const Express = require('express');

module.exports = function (env) {
    fs.readdirSync(__dirname + '/controller').forEach(function (name) {
        const controller = require('./controller/' + name);

        const app = Express();
        app.set('view engine', 'jade');
        app.set('views', __dirname + '/controller/' + name + '/views');
        app.use(controller.router);
        env.use(app);

        console.log('mounted controller ' + name);
    });
};
