const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterDataSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: [true, 'Please fill tag name'],
        unique: true,
        index: true,
    },
    creator: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator can not be empty']
    },
    file: {
        type: String,
        required: [true, 'File can not be empty']
    },
    fileType: {
        type: String,
        required: [true, 'File name can not be empty']
    },
    config: {
        type: Object,
        required: [true, 'Config can not be empty'],
        default: {}
    },
    label: {
        type: String,
        required: [true, 'Please fill label']
    },
    active: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const MasterData = mongoose.model('MasterData', masterDataSchema);
MasterData.addMasterData = ({body}) => {
    return MasterData.create(body);
}
module.exports = MasterData;