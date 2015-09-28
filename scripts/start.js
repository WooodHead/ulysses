const path = require('path');
const spawn = require('child_process').spawn;

const baseDataPath = path.join(__dirname, '..', 'data');
const rethinkdbDataPath = path.join(baseDataPath, 'rethinkdb');
const postgreSqlDataPath = path.join(baseDataPath, 'postgres');
const redisDataPath = path.join(baseDataPath, 'redis');
const esDataPath = path.join(baseDataPath, 'es');

const rethink = spawn('rethinkdb', ['-d', rethinkdbDataPath]);
const postgres = spawn('postgres', ['-D', postgreSqlDataPath]);


rethink.on('data', function (data) {
    console.log(data);
});


postgres.on('data', function (data) {
    console.log(data);
});


postgres.on('close', function (close) {
    console.log(close);
});

rethink.on('close', function (close) {
    console.log(close);
});
