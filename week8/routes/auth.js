const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const router = express.Router();

// Register route
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
});

// Login route
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
