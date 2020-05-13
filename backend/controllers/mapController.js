const map = require('../models/mapModel');
const base = require('./baseController');
const AppError = require('../utils/appError');

exports.createOne = base.createOne(map);
exports.getAll = base.getAll(map);
exports.updateOne = base.updateOne(map);
exports.getOne = base.getOne(map);  
exports.shareMap = async (req, res, next) => {
    try{
        await map.shareMap(req);
        res.status(201).json({
            status: 'success',
            data: null
        });
    }catch(error){
        next(new AppError('424', 'error', 'Failed to share map'));
    }
};