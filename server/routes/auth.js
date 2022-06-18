const express = require('express');
let router = express.Router();
const { signupValidation } = require('../utils/validators');
const { signupUser, loginUser, newToken, logoutUser } = require('../controllers/auth')

router.post('/signup', signupValidation, signupUser);

router.post('/login', loginUser);

router.get('/newToken', newToken);

router.get('/logout', logoutUser);

module.exports = router;