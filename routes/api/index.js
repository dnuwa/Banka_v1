const router = require('express').Router();

const loginController = require('../../controllers/login');
const signupController = require('../../controllers/signup');
const createBankAccount = require('../../controllers/createAccount');
const accountStatus = require('../../controllers/accountStatus');
const deleteAccount = require('../../controllers/deleteAccount');
const bankTransactions = require('../../controllers/transactions')

// import VerifyToken middleware function
const middleware = require('../../middleware');

router.route('/auth/login').post(loginController.login);
router.route('/auth/signup').post(signupController.signup);
router.route('/auth/login').get(loginController.allUsers);
router.route('/accounts').post(middleware.verifyToken, createBankAccount);
router.route('/account/:accountNumber').patch(middleware.verifyToken, accountStatus).delete(middleware.verifyToken, deleteAccount);
router.route('/transactions/:accountNumber/credit').post(middleware.verifyToken, bankTransactions.creditTransaction);
router.route('/transactions/:accountNumber/debit').post(middleware.verifyToken, bankTransactions.debitTransaction);

module.exports = router;
