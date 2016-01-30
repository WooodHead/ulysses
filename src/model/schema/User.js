'use strict';

module.exports = function (sequelize, dataType) {

    const User = sequelize.define('users', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataType.INTEGER
        },
        username: {
            type: dataType.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: dataType.STRING,
            allowNull: true,
            comment: 'The real name (First/LastName)'
        },
        email: {
            type: dataType.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: dataType.STRING,
            allowNull: false
        },
        verified: {
            type: dataType.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        enabled: {
            type: dataType.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        description: {
            type: dataType.STRING,
            allowNull: true
        },
        internalDescription: {
            type: dataType.STRING,
            allowNull: true
        },
        company: {
            type: dataType.STRING,
            allowNull: true
        },
        location: {
            type: dataType.STRING,
            allowNull: true
        },
        avatarUrl: {
            type: dataType.STRING,
            allowNull: true
        },
        passwordResetToken: {
            type: dataType.STRING,
            allowNull: true
        },
        passwordResetTokenSent: {
            type: dataType.DATE,
            allowNull: true
        },
        failedLoginCounter: {
            type: dataType.INTEGER,
            defaultValue: 0
        },
        accountLockedAt: {
            type: dataType.DATE,
            allowNull: true
        },
        lastLogin: {
            type: dataType.DATE
        },
        admin: {
            type: dataType.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        classMethods: {
            /**
             * Build up the relation
             *
             * @param {Map} models all other schema models
             */
            associate: function (models) {
                // currently nothing
            }, indexes: function () {

                sequelize.getQueryInterface().addIndex('users', {
                    unique: true,
                    fields: ['username', 'email'],
                    where: {
                        verified: 1,
                        enabled: 1
                    }
                });

                sequelize.getQueryInterface().addIndex('users', {
                    unique: true,
                    fields: ['email'],
                    where: {
                        verified: 1,
                        enabled: 1
                    }
                });

                sequelize.getQueryInterface().addIndex('users', {
                    unique: true,
                    fields: ['id'],
                    where: {
                        verified: 1,
                        enabled: 1
                    }
                });
            }, findUserById: function (id, cb) {

                User.findById(id)
                    .then(function (result) {

                        cb(null, result);
                    }).error(function (err) {

                        cb(err, null);
                    });
            }, findUserByEmail: function (mail, cb) {

                User.findOne(
                    {
                        where: {
                            email: mail
                        }
                    }).then(function (result) {

                        cb(null, result);
                    }).error(function (err) {

                        cb(err, null);
                    });
            }, findUserByUsername: function (username, cb) {

                User.findOne(
                    {
                        where: {
                            username: username
                        }
                    }).then(function (result) {

                        cb(null, result);
                    }).error(function (err) {

                        cb(err, null);
                    });
            }
        }
    }, {paranoid: true});

    return User;
};
