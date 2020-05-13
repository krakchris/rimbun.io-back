const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        required: [true, 'Config can not be empty']
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

const map = mongoose.model('map', mapSchema);
map.shareMap = ({params, body}) => {
    return map.findOneAndUpdate(
        { "_id": params.id },
        { "$addToSet": { userIds: body.userIds }}
    )
}
module.exports = map;