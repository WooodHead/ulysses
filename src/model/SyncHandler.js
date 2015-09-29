/**
 * This file is responsible for building the schema. It will read all other files in the
 * src/model/schema dir and build a corresponding schema.
 *
 * If a new table is required, add a new file in the src/model/schema directory and this file
 * will pick it up. No other efforts are required.
 */

const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const dbPath = path.join(__dirname, '..', '..', 'data', 'sqlite', 'data.sqlite');
const sequelize = new Sequelize('local', null, null, {
    dialect: 'sqlite',
    storage: dbPath
});

const schema = new Map();

const schemaPath = path.join(__dirname, 'schema');
fs.readdirSync(schemaPath).forEach(function (file) {
    const model = sequelize.import(path.join(schemaPath, file));
    schema.set(model.name, model);
});


schema.forEach(function (value, key) {
    // Call the associate object in the corresponding model using the es6 map.
    if ('associate' in value) {
        schema.get(key).associate(schema);
    }
});


schema.sequelize = sequelize;
schema.Sequelize = Sequelize;

module.exports = schema;
