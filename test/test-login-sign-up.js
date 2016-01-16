const path = require('path');
const request = require('supertest');
const should = require('should');

const app = require('../app');

const tUtil = require('./util/util');

describe('Login SignUp', function () {
    this.timeout(999999);

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


    it('should try to create a new user with non-matching passwords', function (done) {
        request(app)
            .get('/signup')
            .end(function (err, result) {
                should(err).be.null;
                should(result.status).be.equal(200);

                const csrf = tUtil.extractCsrf(result.text);

                request(app)
                    .post('/signup')
                    .send({
                        email: 'test@test.com',
                        username: 'dummy',
                        name: 'dummy',
                        password: '1234567',
                        confirm: '123456',
                        _csrf: csrf
                    })
                    .set('Cookie', tUtil.buildCookie(result.headers['set-cookie']))
                    .end(function (err, result) {
                        should(err).be.null;
                        should(result.status).be.equal(302);
                        should(result.text.match("Found. Redirecting to /signup")).be.true;
                        done();
                    });
            });

    });

    it('should try to create a new user', function (done) {
        request(app)
            .get('/signup')
            .end(function (err, result) {
                should(err).be.null;
                should(result.status).be.equal(200);

                const csrf = tUtil.extractCsrf(result.text);

                request(app)
                    .post('/signup')
                    .send({
                        email: 'test@test.com',
                        username: 'dummy',
                        name: 'dummy',
                        password: '1234567',
                        confirm: '1234567',
                        _csrf: csrf
                    })
                    .set('Cookie', tUtil.buildCookie(result.headers['set-cookie']))
                    .end(function (err, result) {
                        should(err).be.null;
                        should(result.status).be.equal(302);
                        should(result.text.match("Found. Redirecting to /")).be.true;
                        done();
                    });
            });
    });

    it.skip('should try to create a new user while already logged in', function (done) {
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
                should(err).be.null();
                done();
            });
    });
});
