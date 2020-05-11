const express = require('express');
const router = express.Router();
const { signup, login, protect, restrictTo } = require('./../controllers/authController');
const { validateSignUp, validateLogin } = require('../validations/userValidations');
const { getAllUsers } = require('../controllers/userController');

router.post('/', validateSignUp , signup);
router.post('/login', validateLogin, login);

// Protect all routes after this middleware
router.use(protect);

// Only admin have permission to access for the below APIs 
router.use(restrictTo('admin'));

router
    .route('/')
    .get(getAllUsers);

module.exports = router;