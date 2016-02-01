'use strict';

const Git = require('nodegit');
const config = require('../../../config/AppConfig');
const fs = require('fs');
const path = require('path');
const rm = require('rimraf');

const RepositoryModel = require('../export').repository;

class CommonGit {
    constructor (ownerId, repoName, description, options) {
        this.ownerId = ownerId;
        this.repoName = repoName;
        this.description = description;
        this.options = options || {};
    }

    create (done) {
        const combinedPath = this.combinePath();
        RepositoryModel.create({
            title: this.repoName,
            description: this.description,
            path: combinedPath,
            issuesEnabled: this.options.issuesEnabled || true,
            wikiEnabled: this.options.wikiEnabled || true,
            visibility: this.options.visibility || 2,
            OwnerId: this.ownerId
        }).then((result) => {
            Git.Repository.init(combinedPath, 1)
                .then((repository) => {
                    done(null, repository);
                }).err((err) => {
                    done(err, null);
                });
        }).error((err) => {
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
