module.exports = function (sequelize, dataType) {
    return sequelize.define('users', {
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
        isAdmin: {
            type: dataType.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {paranoid: true});
};

