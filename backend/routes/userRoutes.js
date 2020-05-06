const express = require('express');
const router = express.Router();
const { signup, login, protect } = require('./../controllers/authController');
const { validateSignUp, validateLogin } = require('../validations/userValidations');
const { restrictTo } = require('../controllers/authController');

router.post('/signup', validateSignUp , signup);
router.post('/login', validateLogin, login);

// Protect all routes after this middleware
router.use(protect);

// Only admin have permission to access for the below APIs 
router.use(restrictTo('admin'));

module.exports = router;