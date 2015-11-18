module.exports = function (sequelize, dataType) {
    const tableNames = require('../table_names');

    const Issue = sequelize.define(tableNames.issue, {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataType.INTEGER
        },
        title: {
            type: dataType.STRING,
            allowNull: false
        },
        content: {
            type: dataType.STRING,
            allowNull: true
        },
        lastEdit: {
            type: dataType.DATE,
            allowNull: true
        },
        created: {
            type: dataType.DATE,
            allowNull: false
        },
        open: {
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

                Issue.belongsTo(models.get(tableNames.user), {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    },
                    as: 'Author'
                });

                Issue.belongsTo(models.get(tableNames.user), {
                    onDelete: 'SET NULL',
                    foreignKey: {
                        allowNull: true
                    },
                    as: 'Assigned'
                });

                Issue.belongsTo(models.get(tableNames.repository), {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    },
                    as: 'ForRepository'
                });
            }, indexes: function () {

                sequelize.getQueryInterface().addIndex(tableNames.issue, {
                    type: 'FULLTEXT',
                    unique: false,
                    fields: ['title']
                });

                sequelize.getQueryInterface().addIndex(tableNames.issue, {
                    type: 'FULLTEXT',
                    unique: false,
                    fields: ['content']
                });

                sequelize.getQueryInterface().addIndex(tableNames.issue, {
                    type: 'FULLTEXT',
                    unique: false,
                    fields: ['AuthorId']
                });

                sequelize.getQueryInterface().addIndex(tableNames.issue, {
                    type: 'FULLTEXT',
                    unique: false,
                    fields: ['ForRepositoryId']
                });
            }
        }
    }, {paranoid: true});

    return Issue;
};
