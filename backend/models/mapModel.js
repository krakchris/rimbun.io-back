const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const APIFeatures = require('../utils/apiFeatures');

const mapSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Map name can not be empty']
    },
    creator: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator can not be empty']
    },
    config: {
        type: Object,
        default: null
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
        default: false
    }
},{
    timestamps: true
});
mapSchema.pre('save', async function (next) {
    this.userIds = [this.creator];
    next();
});
const Map = mongoose.model('Map', mapSchema);
Map.shareMap = ({params, body}) => {
    return Map.findOneAndUpdate(
        { "_id": params.id },
        { "$addToSet": { userIds: body.userIds }}
    )
}
Map.findUserAssocMap = (query) => {
    return new Promise((resolve)=>{
        const { where = {}, filter: {fields} = {} } = query;
        const features = new APIFeatures(Map.find(where, fields).lean(), query)
            .sort()
            .paginate();
        resolve(features.query);
    });
}
module.exports = Map;