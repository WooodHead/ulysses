'use strict';

const sequelize = require('./bootstrap').sequelize.models;
/*
 * a shorthand wrapper around the different tables -> makes it easier to include
 */
module.exports = {
    user: sequelize.users,
    repository: sequelize.repositories
};
