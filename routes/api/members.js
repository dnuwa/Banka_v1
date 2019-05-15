const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const users = require("../../models/models");

// Gets All users
router.get("/", (req, res) => {
  res.json(users);
});

// Gets single user
router.get("/:id", (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `user with the id of ${req.params.id}` });
  }
});

// Create user
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "activate"
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ msg: "please include name and email" });
  }

  users.push(newUser);
  return res.status(200).json({
    status: 200,
    data: {
      userId: newUser.id,
      name: newUser.name
    }
  });
});

// Update User
router.put("/:id", (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    const upDateUser = req.body;
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = upDateUser.name ? upDateUser.name : user.name;
        user.email = upDateUser.email ? upDateUser.email : user.email;

        res.json({ msg: "user updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: `user with the id of ${req.params.id}` });
  }
});

// Delete user
router.delete("/:id", (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "User deleted",
      users: users.filter(user => user.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `user with the id of ${req.params.id}` });
  }
});

module.exports = router;
