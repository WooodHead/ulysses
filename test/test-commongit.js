const should = require('should');
const git = require('../src/model/common/git');

describe('test-common-git', function () {
    this.timeout(999999);

    it('should create a new object', function (done) {
        const obj = new git(5, 'test');
        obj.should.have.property('ownerId');
        obj.should.have.property('repoName');

        obj.repoName.should.be.a.String();
        obj.ownerId.should.be.a.Number();

        done();
    });

    it('should create a new repository', function (done) {
        const testRepo = new git(5, 'dummy-repo');
        testRepo.create(function (err, repo) {
            should.not.exist(err);
            should.exist(repo);
            done();
        })
    });


    it('should delete the old repository', function (done) {
        const testRepo = new git(5, 'dummy-repo');
        testRepo.remove(function (err) {
            should.not.exist(err);
            done();
        });
    });


    it('should delete a non-existing repository', function (done) {
        const testRepo = new git(99, 'its-not-there-my-fried');
        testRepo.remove(function (err) {
            should.not.exist(err);
            done();
        });
    });
});
