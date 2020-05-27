const map = require('../models/mapModel');
const user =  require('../models/userModel');
const base = require('./baseController');
const AppError = require('../utils/appError');
const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const errMsg = require('../core/errorMessage');

exports.createOne = base.createOne(map);
exports.getAll = base.getAll(map);
exports.updateOne = base.updateOne(map);
exports.getOne = base.getOne(map);  
exports.deleteOne = base.deleteOne(map);

const getUserId = (token) => {
    return promisify(jwt.verify)(token, process.env.JWT_SECRET);
}

exports.shareMap = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const { id: userId } = await getUserId(token);
        req.body.userIds = [userId, ...req.body.userIds];
        await map.shareMap(req);
        res.status(201).json({
            status: 'success',
            data: null
        });
    }catch(error){
        next(new AppError('424', 'error', errMsg['failedToShareMap']));
    }
};

const appendIsShare = (list) => {
    return list.map(item=>{
        item.isShared = (item.userIds.length > 1) ? true : false;
        return item;
    });
}

const getUser = async (id) => {
    return user.findById(id);
}

exports.findUserAssocMap = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const { id: userId } = await getUserId(token);
        req.query.where = Object.assign({},{userIds: userId});
        const [ mapList, {role} ] = await Promise.all([
            map.findMap(req.query),
            getUser(userId)
        ]);
        const doc = role == 'admin' ? appendIsShare(mapList) : mapList;
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });
    }catch(error){
        next(new AppError('404', 'error', errMsg['failedToFindMap']));
    }
}