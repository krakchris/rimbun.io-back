const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const APIFeatures = require('../utils/apiFeatures');

const mapSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Map name can not be empty'],
        unique: true,
        index: true,
    },
    creator: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator can not be empty']
    },
    config: {
        type: Object,
        default: {}
    },
    master: [{
        type: Schema.Types.ObjectId,
        ref: 'MasterData',
        required: [true, 'Master can not be empty']
    }],
    userIds: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    active: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});
mapSchema.pre('save', async function (next) {
    this.userIds = [this.creator];
    next();
});

mapSchema.plugin(uniqueValidator, {
    message: "Map {PATH} already exist."
});

const Map = mongoose.model('Map', mapSchema);

Map.shareMap = ({params, body}) => {
    return Map.findByIdAndUpdate(
        params.id,
        body
    )
}

Map.findMap = (query) => {
    return new Promise((resolve)=>{
        const { where = {}, filter: {fields} = {} } = query;
        const features = new APIFeatures(Map.find(where, fields).lean(), query)
            .sort()
            .paginate();
        resolve(features.query || []);
    });
}

Map.findOneMap = (query) => {
    return new Promise((resolve)=>{
        const { where = {}, filter: {fields} = {} } = query;
        const features = Map.findOne(where, fields).lean()
        resolve(features || {});
    });
}

module.exports = Map;