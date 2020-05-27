const MasterData = require('../models/masterDataModel');
const base = require('./baseController');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const {
    promisify
} = require('util');
const errMsg = require('../core/errorMessage');

const getUserId = (token) => {
    return promisify(jwt.verify)(token, process.env.JWT_SECRET);
}

exports.createOne = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const { id: creator } = await getUserId(token);
        Object.assign(req.body, {creator});
        await MasterData.addMasterData(req);
        res.status(201).json({
            status: 'success',
            data: null
        });
    }catch(error){
        next(new AppError('424', 'error', errMsg['failedToaddData']));
    }
}
exports.getAll = base.getAll(MasterData);
exports.getOne = base.getOne(MasterData)
