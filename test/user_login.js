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

describe.only('Login Authentication ', () => {
    beforeEach(() => {
        database.length = 0; // empty user collection
    });
    describe('POST', () => {
        // Signup and login
        it('should be able to login', (done) => {
            chai.request(BASE_URL)
                .post(SIGNUP_URL)
                .send(base.signup_user_1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('id').eql(1);
                });

            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send(base.login_user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('id').eql(1);
                    done();
                });
        });
        it('should raise an error if password or email are missing', (done) => {
            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send({ email: '', password: '' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
        it('wrong email or password', (done) => {
            chai.request(BASE_URL)
                .post(SIGNUP_URL)
                .send(base.signup_user_1)
                .end((err, res) => {
                    res.should.have.status(200);
                });
            chai.request(BASE_URL)
                .post(LOGIN_URL)
                .send(base.login_user_2)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
});
