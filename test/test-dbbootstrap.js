'use strict';

const bootstrap = require('../src/model/bootstrap');
const should = require('should');
const DbConnector = require('../src/model/db_connector');

describe('Db bootstrap', () => {

    it('should connect to the db', (done) => {
        DbConnector.connectToDb(function (err) {
            should.not.exist(err);
            done()
        })
    });

    it('should try to load the schema', (done) => {
        bootstrap.sequelize.sync().then(() => {
            const user = bootstrap.sequelize.models.users;
            const repositories = bootstrap.sequelize.models.repositories;
            should(user).be.not.null;
            should(repositories).be.not.null;

            done();
        }).error((err) => {
            should.be.null(err);
            done();
        });
    });
});
