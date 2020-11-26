const express = require('express');
const router = express.Router();
const { getAllUsers } = require("./users");

router.get('/', (req, res) => {
  res.send("Landing");
});

router.get('/users', (req, res) => {
  const users = getAllUsers();

  res.json(users);
})

module.exports = router;