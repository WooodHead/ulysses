'use strict';

const Git = require('nodegit');
const config = require('../../../config/AppConfig');
const fs = require('fs');
const path = require('path');
const rm = require('rimraf');

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

    remove (done) {
        const combinedPath = this.combinePath();
        rm(combinedPath, (err) => {
            done(err);
        });
    }

    path () {
        return this.combinePath();
    }
}


module.exports = CommonGit;
