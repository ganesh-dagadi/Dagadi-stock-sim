const express = require('express');
let router = express.Router();
const { signupValidation } = require('../utils/validators');
const { authenticateUser } = require('../utils/authenticateUser');
const { signupUser, loginUser, newToken, logoutUser, protectedcontrol } = require('../controllers/auth')

router.post('/signup', signupValidation, signupUser);

router.post('/login', loginUser);

router.get('/newToken', newToken);

router.get('/logout', logoutUser);

router.get('/protected', authenticateUser, protectedcontrol)

module.exports = router;