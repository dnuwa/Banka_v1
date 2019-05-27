# Banka_v1

[![Build Status](https://travis-ci.org/dnuwa/Banka_v1.svg?branch=develop)](https://travis-ci.org/dnuwa/Banka_v1)                [![Coverage Status](https://coveralls.io/repos/github/dnuwa/Banka_v1/badge.svg?branch=develop)](https://coveralls.io/github/dnuwa/Banka_v1?branch=develop)              [![Maintainability](https://api.codeclimate.com/v1/badges/7b4cbe7027d994341e7b/maintainability)](https://codeclimate.com/github/dnuwa/Banka_v1/maintainability)

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

### Hosted Apps

- Banka [API](https://banka-ds.herokuapp.com/api/v1)

#### Requirements

- [Node](https://nodejs.org/en/) Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

# Getting Started

In your terminal

1. Clone the repo locally to your machine by running `git clone https://github.com/dnuwa/Banka_v1.git`
2. change your current directory (`cd`) to wherever you cloned the app in 1 above.

#### Development setup

- Install dependencies
  ```bash
  npm install
  ```

#### Run the application

```bash
npm run dev
```

#### Running tests

```bash

npm run ttest

```

#### API REST End Points

| End Point                                    | Verb   | Use                                   |
| -------------------------------------------- | ------ | ------------------------------------- |
| `/api/v1/auth/signup`                        | POST   | Create user account                   |
| `/api/v1/auth/login`                         | POST   | User login                            |
| `/api/v1/account`                            | POST   | Create Bank account                   |
| `/api/v1/account/:accountNumber`              | PATCH  | Updates account status by staff/admin |
| `/api/v1/transactions/:accountNumber/credit` | POST   | Credits a bank account by a staff     |
| `/api/v1/transactions/:accountNumber/debit`  | POST   | Debits a bank account by staff        |
| `/api/v1/account/:accountNumber`              | DELETE | Deletes a bank account                |
| `/api/v1/account/history`                    | GET    | Gets user account transaction history |
| `/api/v1/auth/login`                         | GET    | Retrieves all user accounts           |

#### Built With

- [Express](https://expressjs.com/) A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
