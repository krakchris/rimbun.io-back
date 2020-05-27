const User = require('../models/userModel');
const Map = require('../models/mapModel');
const base = require('./baseController');
const AppError = require('../utils/appError');
const { querySchema } = require('../services/prepareData');
const errMsg = require('../core/errorMessage');

exports.deleteMe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

const appendIsMapShared = (users, { userIds = []}) => {
    userIds = userIds.map(id=>id.toString());
    return users.map((user) => {
        user.isShared = userIds.indexOf(user._id.toString()) > -1 ? true : false ;
        return user;
    })||[] ;
};
exports.getAllUsers = async (req, res, next) => {
    try{
        let userList = await User.getUserListing(req.query) || [];
        const { mapId } = req.query;
        const mapAssocUsers = await Map.findOneMap(querySchema['mapAssocUsers']({mapId})) || {};
        userList = appendIsMapShared(userList, mapAssocUsers);
        res.status(200).json({
            status: 'success',
            results: userList.length,
            data: {
                data: userList
            }
        });
    }catch(error){
        next(new AppError('404', 'error', errMsg['failedToFindMap']));
    }
};
exports.getUser = base.getOne(User);

// Don't update password on this 
exports.updateUser = base.updateOne(User);
exports.deleteUser = base.deleteOne(User);