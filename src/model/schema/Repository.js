module.exports = function (sequelize, dataType) {
    const tableNames = require('../table_names');

    const Repository = sequelize.define(tableNames.repository, {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataType.INTEGER
        },
        title: {
            type: dataType.STRING,
            allowNull: false
        },
        description: {
            type: dataType.STRING,
            allowNull: true
        },
        defaultBranch: {
            type: dataType.STRING,
            allowNull: false,
            defaultValue: 'master'
        },
        path: {
            type: dataType.STRING,
            allowNull: false
        },
        issuesEnabled: {
            type: dataType.BOOLEAN,
            defaultValue: false
        },
        issueTemplate: {
            type: dataType.STRING,
            allowNull: true,
            comment: 'a template for each new issue'
        },
        issueUsage: {
            type: dataType.ENUM,
            values: [0, 1, 2, 3],
            defaultValue: 1,
            /*eslint-disable */
            comment: '0 = everybody can create issue (with or without an account), 1 = only registered members, 2 = only group member, 3 = only the owner'
            /*eslint-enable */
        },
        wikiEnabled: {
            type: dataType.BOOLEAN,
            defaultValue: false
        },
        lastActivity: {
            type: dataType.DATE,
            default: dataType.NOW
        },
        commitCount: {
            type: dataType.INTEGER,
            defaultValue: 0
        },
        numberingCounter: {
            type: dataType.INTEGER,
            defaultValue: 0,
            comment: 'numberingCounter for each new issue or pr'
        },
        incrementBy: {
            type: dataType.INTEGER,
            defaultValue: 1,
            comment: 'increment the numberingCounter by value XYZ'
        },
        contribution: {
            type: dataType.ENUM,
            values: [0, 1, 2],
            defaultValue: 2,
            /*eslint-disable */
            comment: '0 = no contributions from others, 1 = contributions from organisation, 2 = free for everyone'
            /*eslint-enable */
        },
        visibility: {
            type: dataType.ENUM,
            values: [0, 1, 2, 3],
            defaultValue: 0,
            /*eslint-disable */
            comment: '0 = everybody can see it, 1 = only for registered users, 2 = only members of your organisation can see it, 3 = only you and invited members can see it'
            /*eslint-enable */
        },
        cloneable: {
            type: dataType.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            /**
             * Build up the relation
             *
             * @param {Map} models all other schema models
             */
            associate: function (models) {

                Repository.belongsTo(models.get(tableNames.user), {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    },
                    as: 'Owner'
                });

            }, indexes: function () {

                sequelize.getQueryInterface().addIndex(tableNames.repository, {
                    type: 'FULLTEXT',
                    unique: false,
                    fields: ['title']
                });

                sequelize.getQueryInterface().addIndex(tableNames.repository, {
                    type: 'FULLTEXT',
                    unique: false,
                    fields: ['description', 'title']
                });

                sequelize.getQueryInterface().addIndex(tableNames.repository, {
                    type: 'FULLTEXT',
                    unique: false,
                    fields: ['OwnerId']
                });
            }, findRepositoryByOwnerId: function (ownerId, cb) {

                Repository.findAll(
                    {
                        where: {
                            OwnerId: ownerId
                        }
                    }).then(function (result) {

                        cb(null, result);
                    }).error(function (err) {

                        cb(err, null);
                    });
            }
        }
    }, {paranoid: true});

    return Repository;
};
