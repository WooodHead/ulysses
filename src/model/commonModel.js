const sequelize = require('./bootstrap').sequelize.models;

module.exports = {
    user: sequelize.users,
    repository: sequelize.repositories
};
