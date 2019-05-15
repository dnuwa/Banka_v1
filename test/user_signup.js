const chai = require('chai');
const chaiHttp = require('chai-http');

require('../index');

const models = require('../models/models');
const base = require('./base');
const BASE_URL = 'http://127.0.0.1:5000/api/members';
const SIGNUP_URL = '/';

chai.use(chaiHttp);
chai.should();

describe.only('add a user', ()=>{
    beforeEach(() => {
        models.length = 0;
      });

    describe('POST', () => {

        it('should add a user to the array', (done) => {
            chai.request(BASE_URL)
            .post(SIGNUP_URL)
            .send(base.signup_user_1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.data.should.have.property('userId');
                done();
            });
        });
    });
});
