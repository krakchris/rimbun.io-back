const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        required: [true, 'Config can not be empty']
    },
    master: {
        type: Schema.Types.ObjectId,
        ref: 'MasterData',
        required: [true, 'Master can not be empty']
    },
    userIds: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    active: {
        type: Boolean,
        default: false
    }
});
mapSchema.pre('save', async function (next) {
    this.userIds = [this.creator];
    next();
});
const Map = mongoose.model('Map', mapSchema);
Map.shareMap = ({params, body}) => {
    return map.findOneAndUpdate(
        { "_id": params.id },
        { "$addToSet": { userIds: body.userIds }}
    )
}
module.exports = Map;