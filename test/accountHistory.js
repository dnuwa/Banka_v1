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
describe.only('User transaction history', () => {
    before(() => {
        database.users.length = 0; // empty user collection
        chai.request(BASE_URL)
            .post(SIGNUP_URL)
            .send(base.signup_user_7)
            .end();
    });
    describe('GET', () => {
        it('should 200 when user retreives transaction history', (done) => {
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
                                .get('/account/history') // change account status
                                .set('x-access-token', res.body.data.token)
                                .end((err, response) => {
                                    response.should.have.status(200);
                                    response.body.should.be.a('object');
                                    response.body.should.have.property('status');
                                    response.body.should.have.property('data');
                                    done();
                                });
                        });
                });
        });
    });
});
