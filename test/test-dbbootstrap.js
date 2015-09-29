const bootstrap = require('../src/model/bootstrap');
const should = require('should');

describe('Db bootstrap', function () {
    this.timeout(9999999);

    it('should try to load the schema', function (done) {
        bootstrap.sequelize.sync().then(function () {
            const user = bootstrap.sequelize.models.users;
            const repositories = bootstrap.sequelize.models.repositories;
            should(user).be.not.null;
            should(repositories).be.not.null;

            done();
        }).error(function (err) {
            should.be.null(err);
            done();
        });
    });
});
