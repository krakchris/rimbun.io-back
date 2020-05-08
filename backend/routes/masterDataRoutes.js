const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');
const { validateSignUp, validateLogin } = require('../validations/userValidations');
const { validateMasterData } = require('../validations/masterDataValidations');
const { restrictTo } = require('../controllers/authController');
const { createOne } = require('../controllers/masterDataController');
// Protect all routes after this middleware
router.use(protect);

// Only admin have permission to access for the below APIs 
router.use(restrictTo('admin'));

router.post('/', validateMasterData, createOne);

module.exports = router;