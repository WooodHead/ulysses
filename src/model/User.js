const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'data', 'sqlite', 'data.sqlite');

console.log(dbPath);
const Sequelize = require('sequelize');
const sequalize = new Sequelize('local', null, null, {
    dialect: 'sqlite',
    storage: dbPath
});

const User = sequalize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    internalDescription: {
        type: Sequelize.STRING,
        allowNull: true
    },
    company: {
        type: Sequelize.STRING,
        allowNull: true
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true
    },
    avatarUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    passwordResetTokenSent: {
        type: Sequelize.DATE,
        allowNull: true
    },
    failedLoginCounter: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    accountLockedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    lastLogin: {
        type: Sequelize.DATE
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {paranoid: true});


sequalize.sync().then(function () {
    console.log('synchronized');
});

module.exports = User;
