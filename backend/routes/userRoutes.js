const express = require('express');
const router = express.Router();
const { signup } = require('./../controllers/authController');
const { validateSignUp } = require('../validations/userValidations');

router.post('/signup', validateSignUp , signup);

module.exports = router;