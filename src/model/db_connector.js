const config = require('../../config/AppConfig');
const env = require('../util/env');
const syncRequired = (process.env.SYNC_DB === 'yes') || config.db.syncOnStartUp || env.isCITest;


exports.connectToDb = function connectToToDb (done) {
// Init schema
// WARNING: Forced sync => drop table!
    require('./bootstrap').sequelize.sync({force: syncRequired})
        .then((result) => {

            // only sync if it's required.
            if (syncRequired) {
                const models = result.models;
                models.repositories.indexes();
                models.users.indexes();
            }


            if (typeof done === 'function') {
                done(null);
            }
        });
};
