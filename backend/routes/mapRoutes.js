const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const { validateMap, validateShareMap } = require('../validations/mapValidations');
const { 
    createOne, 
    getAll, 
    updateOne, 
    getOne, 
    shareMap, 
    deleteOne,
    findUserAssocMap 
} = require('../controllers/mapController');
const { prepareQuery } = require('../services/prepareData');
// Protect all routes after this middleware
router.use(protect);

router
    .route('/getUserAssocMap')
    .get(prepareQuery, findUserAssocMap);

router
    .route("/getMap/:id")
    .get(prepareQuery, getOne);
    
// Only admin have permission to access for the below APIs 
router.use(restrictTo('admin'));

router
    .route('/')
    .post(validateMap, createOne)
    
router
    .route('/getMapByMasterId')
    .get(prepareQuery, getAll);

router
    .route('/:id')
    .patch(updateOne)
    .delete(deleteOne);

router
    .route('/share/:id')
    .post(validateShareMap, shareMap);
    
module.exports = router;