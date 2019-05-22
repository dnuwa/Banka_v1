// Import dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
require('../index');
// import out user collection(database)
const database = require('../models');
const base = require('./base');

// Base URL
const BASE_URL = 'http://localhost:5000/api/v1';
const LOGIN_URL = '/auth/login';
const SIGNUP_URL = '/auth/signup';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe.only('Account creation ', () => {
    before(() => {
        database.length = 0; // empty user collection
        chai.request(BASE_URL)
            .post(SIGNUP_URL)
            .send(base.signup_user_1)
            .end();
    });
    describe('POST', () => {
        it('should create a new bank account', (done) => {
            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send(base.login_user)
                .end((err, res) => {
                    chai.request(BASE_URL)
                        .post('/accounts')
                        .set('x-access-token', res.body.data.token)
                        .send(base.bank_account_1)
                        .end((err, resp) => {
                            resp.should.have.status(201);
                            resp.body.should.be.a('object');
                            resp.body.should.have.property('status');
                            resp.body.should.have.property('data');
                            done();
                        });
                });
        });

        it('should return 400 for an ivalid account type', (done) => {
            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send(base.login_user)
                .end((err, res) => {
                    chai.request(BASE_URL)
                        .post('/accounts')
                        .set('x-access-token', res.body.data.token)
                        .send(base.bank_account_2)
                        .end((err, resp) => {
                            resp.should.have.status(400);
                            resp.body.should.be.a('object');
                            resp.body.should.have.property('status');
                            resp.body.should.have.property('error');
                            done();
                        });
                });
        });
        it('should return 401 for unauthorized user', (done) => {
            chai.request(BASE_URL)
                .post('/accounts')
                .send(base.signup_user_1)
                .end((err, resp) => {
                    resp.should.have.status(401);
                    resp.body.should.be.a('object');
                    resp.body.should.have.property('status');
                    resp.body.should.have.property('message');
                    done();
                });
        });

        it('should return 400 when an account type is not provided', (done) => {
            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send(base.login_user)
                .end((err, res) => {
                    chai.request(BASE_URL)
                        .post('/accounts')
                        .set('x-access-token', res.body.data.token)
                        .end((err, resp) => {
                            resp.should.have.status(400);
                            resp.body.should.be.a('object');
                            resp.body.should.have.property('status');
                            resp.body.should.have.property('error');
                            done();
                        });
                });
        });
    });
});
