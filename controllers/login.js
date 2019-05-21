/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
// import token generator
// const middleware = require('../../middleware');
// import user data storage
const users = require('../models');
console.log(users);
// user login
exports.login = (req, res) => {
	const { password, email } = req.body;
	// Email and Password are required
	if (!email || !password) {
		return res.status(400).json({
			status: 400,
			error: 'Email, Password and type are required !',
		});
	}

	// Get for the currently logged in user
	const returnUser = user => bcrypt.compareSync(password, user.password) && user.email === email;
	const userObject = users.find(returnUser);

	if (!userObject) {
		// Wrong password
		return res.status(401).json({
			status: 401,
			error: 'Wrong email or password',
		});
	}

	// return the JWT token for the future API calls
	return res.status(200).json({
		status: 200,
		data: {
			// token: middleware.token(userObject.id),
			id: userObject.id,
			firstName: userObject.firstName,
			lastName: userObject.lastName,
			email: userObject.email,
		},
	});
};

// fetch all users
exports.allUsers = (req, res) => res.status(200).json({
	status: 200,
	data: users,
});
