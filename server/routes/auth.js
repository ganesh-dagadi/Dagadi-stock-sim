const express = require('express');
let router = express.Router();
const { signupValidation } = require('../utils/validators');
const { signupUser, loginUser } = require('../controllers/auth')

router.post('/signup', signupValidation, signupUser)

router.post('/login', loginUser)

module.exports = router;