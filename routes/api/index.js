const router = require('express').Router();

const loginController = require('../../controllers/login');
const signupController = require('../../controllers/signup');
const createBankAccount = require('../../controllers/createAccount');

// import VerifyToken middleware function
const middleware = require('../../middleware');

router.route('/auth/login').post(loginController.login);
router.route('/auth/signup').post(signupController.signup);
router.route('/auth/login').get(loginController.allUsers);
router.route('/accounts').post(middleware.verifyToken, createBankAccount);

module.exports = router;
