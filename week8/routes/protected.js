const express = require('express');
const { verifyToken } = require('../utils/jwt');
const router = express.Router();

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'You are not logged in!' });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token!' });
  }
};

// Protected route example
router.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route!' });
});

module.exports = router;
