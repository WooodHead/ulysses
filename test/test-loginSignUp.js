const spawn = require('child_process').spawn;
const path = require('path');
const request = require('supertest');
const should = require('should');

const appPath = path.join(__dirname, '..', 'app.js');
var runningApp = {};

const app = require('../app');
describe('Login SignUp', function () {
    this.timeout(999999);

    before(function (done) {
        runningApp = spawn('node', [appPath]);

        setTimeout(function () {
            done();
        }, 800);
    });

    it('should get the login page', function (done) {
        request(app)
            .get('/login')
            .end(function (err, result) {
                should(err).be.null;
                should(result.status).be.equal(200);
                done();
            });
    });

    it('should get the signup page', function (done) {
        request(app)
            .get('/signup')
            .end(function (err, result) {
                should(err).be.null;
                should(result.status).be.equal(200);
                done();
            });
    });


    it('should try to create a new user with non-matching passwords (missing csrf)', function (done) {
        request(app)
            .post('/signup')
            .send({
                email: 'test@test.com',
                username: 'dummy',
                name: 'dummy',
                password: '1234567',
                confirm: '123456'
            })
            .end(function (err, result) {
                should(err).be.null;
                should(result.status).be.equal(302);
                done();
            });
    });

    it('should try to create a new user (missing csrf)', function (done) {
        request(app)
            .post('/signup')
            .send({
                email: 'test@test.com',
                username: 'dummy',
                name: 'dummy',
                password: '123456',
                confirm: '123456'
            })
            .end(function (err, result) {
                should(err).be.null;
                should(result.status).be.equal(302);
                done();
            });
    });

    it('should try to create a new user while already logged in', function (done) {
        request(app)
            .post('/signup')
            .send({
                email: 'test@test.com',
                username: 'dummy',
                name: 'dummy',
                password: '123456',
                confirm: '123456'
            })
            .end(function (err, result) {
                should(result.status).be.equal(302);
                done();
            });
    });

    after(function (done) {
        runningApp.kill('SIGKILL');
        setTimeout(function () {
            done();
        }, 500);
    });
});
