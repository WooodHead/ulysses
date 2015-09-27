const fs = require('fs');
const Express = require('express');

module.exports = function (env) {
    fs.readdirSync(__dirname + '/controller').forEach(function (name) {
        const controller = require('./controller/' + name);
        const app = Express();


        app.set('view engine', 'jade');
        app.set('views', __dirname + '/controller/' + name + '/views');

        const definitions = controller.definition;

        for (var i = 0; i < definitions.length; i++) {
            const element = definitions[i];
            const method = element.method;
            const path = element.path;
            const handler = element.handler;
            const isSecure = element.isSecure || false;

            app[method](path, handler);
        }
        env.use(app);
    });
};
