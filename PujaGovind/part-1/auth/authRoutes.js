const express = require('express');
const authController = require('./authController');

const router = express.Router();

// Route for login
router.post('/login', authController.login);

// Route for logout
router.get('/logout', authController.logout);

module.exports = router;

