// Import Bank account database
const { bankAccount } = require('../models');
// Current user information
const utils = require('../utilities');

// Delete bank account
const deleteAccount = (req, res) => {
    const { params: { accountNumber } } = req;

    // User must be staff/admin to perform the operation
    if (utils.isNotClient(utils.currentUser(req.userId), res)) {
        return utils.isNotClient(utils.currentUser(req.userId), res);
    }

    // Check for bank account with the provided account number
    let accountObj = null;
    let index = null;
    bankAccount.forEach((account, i) => {
        if (account.accountNumber.toString() === accountNumber) {
            accountObj = account;
            index = i;
        }
    });

    // Check if account exists
    if (utils.ifNoAccount(accountObj, res)) {
        // Account does not exist
        return utils.ifNoAccount(accountObj, res);
    }
    // Delete bank account
    bankAccount.splice(index, 1);
    // Return account details
    return res.status(202).json({
        status: 202,
        data: {
            message: `Account with accountNumber: ${accountNumber} has been successfuly deleted`,
        },
    });
};

module.exports = deleteAccount;
