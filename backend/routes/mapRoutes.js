const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const { validateMap, validateShareMap } = require('../validations/mapValidations');
const { createOne, getAll, updateOne, getOne, shareMap, getUserAssociatedMaps } = require('../controllers/mapController');
// Protect all routes after this middleware
router.use(protect);

// Only admin have permission to access for the below APIs 
router.use(restrictTo('admin'));

router
    .route('/')
    .post(validateMap, createOne)
    .get(getAll);
    
router
    .route('/:id')    
    .get(getOne)
    .patch(updateOne);

router
    .route('/share/:id')
    .post(validateShareMap, shareMap)
    
module.exports = router;