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
describe.only('Change account status by admin/staff', () => {
    before(() => {
        database.users.length = 0; // empty user collection
        chai.request(BASE_URL)
            .post(SIGNUP_URL)
            .send(base.signup_user_7)
            .end();
    });
    describe('POST', () => {
        it('should raise 202  when account is deleted', (done) => {
            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send(base.signup_user_7)
                .end((err, res) => {
                    chai.request(BASE_URL)
                        .post('/accounts') // create account
                        .set('x-access-token', res.body.data.token)
                        .send(base.bank_account_1)
                        .end((err, resp) => {
                            chai.request(BASE_URL)
                                .delete(`/account/${resp.body.data.accountNumber}`) // change account status
                                .set('x-access-token', res.body.data.token)
                                .end((err, response) => {
                                    response.should.have.status(202);
                                    response.body.should.be.a('object');
                                    response.body.should.have.property('status');
                                    response.body.should.have.property('data');
                                    done();
                                });
                        });
                });
        });
    });

    // *****
    it('should raise 404 when account does not exist', (done) => {
        chai.request(BASE_URL)
            .post(LOGIN_URL)
            .send(base.signup_user_7)
            .end((err, res) => {
                chai.request(BASE_URL)
                    .post('/accounts') // create account
                    .set('x-access-token', res.body.data.token)
                    .send(base.bank_account_1)
                    .end((err, resp) => {
                        chai.request(BASE_URL)
                            .delete('/account/invalid') // change account status
                            .set('x-access-token', res.body.data.token)
                            .send({ status: 'draft' })
                            .end((err, response) => {
                                response.should.have.status(404);
                                response.body.should.be.a('object');
                                response.body.should.have.property('status');
                                response.body.should.have.property('error');
                                done();
                            });
                    });
            });
    });
});

// *********************************
describe.only('Client can not change account status ', () => {
    before(() => {
        database.users.length = 0; // empty user collection
        chai.request(BASE_URL)
            .post(SIGNUP_URL)
            .send(base.signup_user_1)
            .end();
    });
    describe('DELETE', () => {
        it('should raise 401 client attempts to delete account', (done) => {
            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send(base.login_user)
                .end((err, res) => {
                    chai.request(BASE_URL)
                        .post('/accounts') // create account
                        .set('x-access-token', res.body.data.token)
                        .send(base.bank_account_1)
                        .end((err, resp) => {
                            chai.request(BASE_URL)
                                .delete(`/account/${resp.body.data.accountNumber}`) // change account status
                                .set('x-access-token', res.body.data.token)
                                .end((err, response) => {
                                    response.should.have.status(401);
                                    response.body.should.be.a('object');
                                    response.body.should.have.property('status');
                                    response.body.should.have.property('error');
                                    done();
                                });
                        });
                });
        });
    });
});
