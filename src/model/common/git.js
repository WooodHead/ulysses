'use strict';
const Git = require('nodegit');
const config = require('../../../config/AppConfig');
const fs = require('fs');
const path = require('path');

class CommonGit {
    constructor (ownerId, repoName) {
        this.ownerId = ownerId;
        this.repoName = repoName;
    }

    create (done) {
        const combinedPath = this.combinePath();

        Git.Repository.init(combinedPath, 1)
            .then(function (repository) {
                done(null, repository);
            }).catch(function (err) {
                done(err, null);
            });
    }

    combinePath () {
        const resolvedBasePath = path.resolve(config.git.basePath);

        return path.join(resolvedBasePath, '' + this.ownerId, this.repoName);
    }

    delete (done) {
        const combinedPath = this.combinePath();
        fs.chmod(combinedPath, '777', function (err) {
            if (!err) {
                fs.unlink(combinedPath, function (err) {
                    done(err);
                });
            }
        });
    }

    path () {
        return this.combinePath();
    }
}


module.exports = CommonGit;
