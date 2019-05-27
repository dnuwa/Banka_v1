// Import Bank account database
const { bankAccount } = require('../models');
// Current user information
const utils = require('../utilities');

// Create bank account
const transationHistory = (req, res) => {
    // Getting the current user object
    const user = utils.currentUser(req.userId);

    if (!user) {
        // It is possible to have no user object but with valid token Forexample if header
        // contains a token with id of user not existing because user list was reset
        return res.status(401).json({
            status: 401,
            error: 'Token has expired, please login again!',
        });
    }

    // Check for bank account with the provided account number
    let accountObj = null;
    bankAccount.forEach((account) => {
        if (account.owner === req.userId) {
            accountObj = account;
        }
    });

    return res.status(200).json({
        status: 200,
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountObj,
        },
    });
};

module.exports = transationHistory;
