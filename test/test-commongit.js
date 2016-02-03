'use strict';

const should = require('should');
const Git = require('../src/model/common/git');
const User = require('../src/model/export').user;
const DbConnector = require('../src/model/db_connector');

describe('test-common-git', () => {

    it('should create the db connection', (done) => {
        DbConnector.connectToDb(function (err) {
            should.not.exist(err);

            done();
        });
    });

    var userId = 0;
    it('should create a new object', (done) => {
        User.create({
            email: 'test-common-git',
            username: 'test-common-git',
            password: 123
        }).then((result) => {
            userId = result.dataValues.id;
            const obj = new Git(5, 'test', 'my dummy description', {wikiEnabled: false});
            obj.should.have.property('ownerId');
            obj.should.have.property('repoName');

            obj.repoName.should.be.a.String();
            obj.ownerId.should.be.a.Number();
            done();
        }).catch((err) => {
            should.not.exist(err);
            done()
        })

    });

    it('should create a new repository', (done) => {
        const testRepo = new Git(userId, 'test', 'my dummy description', {wikiEnabled: false});
        testRepo.create((err, repo) => {
            should.not.exist(err);
            should.exist(repo);
            done();
        })
    });


    it('should delete the old repository', (done) => {
        const testRepo = new Git(5, 'dummy-repo');
        testRepo.remove((err) => {
            should.not.exist(err);
            done();
        });
    });


    it('should delete a non-existing repository', function (done) {
        const testRepo = new Git(99, 'its-not-there-my-fried');
        testRepo.remove((err) => {
            should.not.exist(err);
            done();
        });
    });
});
