const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const { validateMasterData } = require('../validations/masterDataValidations');
const { createOne, getAll, getOne } = require('../controllers/masterDataController');
const { prepareQuery } = require('../services/prepareData');
// Protect all routes after this middleware
router.use(protect);

// Only admin have permission to access for the below APIs 
router.use(restrictTo('admin'));

router
    .route('/')
    .post(validateMasterData, createOne);

router
    .route('/getAllTags')
    .get(prepareQuery, getAll);

router
    .route('/:id')
    .get(getOne);

module.exports = router;