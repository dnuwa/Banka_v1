const router = require('express').Router();

const loginController = require('../../controllers/login');
const signupController = require('../../controllers/signup');


router.route('/auth/login').post(loginController.login);
router.route('/auth/signup').post(signupController.signup);
router.route('/auth/login').get(loginController.allUsers);

module.exports = router;
