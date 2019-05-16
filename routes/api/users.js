const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const uuid = require("uuid");
const users = require("../../models/models");


const checkName = (name, res) => {
  if (!name.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/)) {
    return res.status(400).json({
      status: 400,
      error: 'Names should not contain special characters',
    });
  }
};

const checkEmail = (email, res) => {
  // Validate email
  if (!email.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]{2,}$/)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid email format ',
    });
  }
};

const checkPassword = (password, res) => {
  if (!password.match(/^(?=.*\d)[0-9a-zA-Z]{8,}$/)) {
    return res.status(400).json({
      status: 400,
      error: 'Weak password, must be at least 8 characters and have at least 1 letter and number',
    });
  }
};

// Type should be client / staff
const checkUserType = (userType, res) => {
  const userTypes = ['client', 'staff'];

  const isTrue = userTypes.indexOf(userType);
  if (isTrue < 0) {
    return res.status(400).json({
      status: 400,
      error: 'Type should either be client / staff',
    });
  }
};

// Create user
router.post("/", (req, res) => {
  const { email, first_name, last_name, password, type, isAdmin } = req.body;
  // Email and Password are required
  if (!email || !password || !type || !first_name) {
    return res.status(400).json({
      status: 400,
      error: 'email, password, first_name and type are required !',
    });
  }

  // format firstName and lastName
  const fisrtN = first_name ? first_name.trim() : '';
  const lastN = last_name ? last_name.trim() : '';

  // Check firstName
  if (checkName(fisrtN, res)) {
    return checkName(fisrtN, res);
  }

  // Check lastName....since lastName is not required we 1st check if it is present
  if (lastN) {
    if (checkName(lastN, res)) {
      return checkName(lastN, res);
    }
  }

  // Validate email
  if (checkEmail(email, res)) {
    return checkEmail(email, res);
  }

  // Validate password
  if (checkPassword(password, res)) {
        return checkPassword(password, res);
      }
    
      // Type should be client / staff
      const userType = type.toLowerCase();
      if (checkUserType(userType, res)) {
        return checkUserType(type, res);
      }
    
      // isAdmin should be [false/true]
      const booln = ['false', 'true'];
      const admin = isAdmin ? isAdmin.toLowerCase() : 'false';
      const result = booln.indexOf(admin);
      if (result < 0) {
        return res.status(400).json({
          status: 400,
          error: 'isAdmin should be set to true/false',
        });
      }
  
      let isAdminTrue = admin;
  if (type === 'client') {
    isAdminTrue = false;
  }

  // generate user id basing on list length
  const userId = users.length + 1;

  // hashpassword
  const hashedPassword = bcrypt.hashSync(password, 8);

  // capture data
  const data = {
    id: userId,
    email,
    firstName: fisrtN,
    lastName: lastN,
    password: hashedPassword,
    type: userType,
    isAdmin: isAdminTrue,
  };

  const doesEmailAlreadyExist = users.some(user => user.email === data.email);
  if (doesEmailAlreadyExist) {
    return res.status(400).json({
      status: 400,
      error: 'Email already exists, try another',
    });
  }
  users.push(data);

  // return the JWT token for the future API calls
  return res.status(200).json({
    status: 200,
    data: {
      // token: middleware.token(data.id),
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email,
      type: data.userType,
      isAdmin: data.isAdmin,
    },
  });
});

// Gets All users
router.get("/", (req, res) => {
  res.json(users);
});

module.exports = router;
