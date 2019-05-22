// Import Bank account database
const bankAccount = require('../models');
// Current user information
const utils = require('../utilities');

const datetime = new Date();

// Generate a bank account number, a nine character number
const accountGenerator = () => Math.floor(Math.random() * 1000000000);

// Create bank account
const createBankAccount = (req, res) => {

    const { type } = req.body;
    // Email and Password are required
    if (!type) {
        return res.status(400).json({
            status: 400,
            error: 'Account type is required !',
        });
    }

    // TYpe should be current or savings
    const accountTypes = ['savings', 'current', 'loan'];
    type.toLowerCase();
    const isTrue = accountTypes.indexOf(type);
    if (isTrue < 0) {
        return res.status(400).json({
            status: 400,
            error: 'Type should either be savings, current / loan',
        });
    }

    // generate user id basing on list length
    const accountId = bankAccount.length + 1;

    // Bank account details
    const data = {
        id: accountId,
        accountNumber: accountGenerator(),
        createdOn: datetime,
        owner: req.userId,
        status: 'active',
        type,
        balance: 0.00,
        transactionHistory: [],
    };

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
    // add create bank account
    bankAccount.push(data);

    // account response
    return res.status(201).json({
        status: 201,
        data: {
            accountNumber: data.accountNumber,
            createdOn: data.createdOn,
            status: data.status,
            type: data.type,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            openingBalance: data.balance,
        },
    });
};

module.exports = createBankAccount;
