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
    csv: {
        type: String,
        required: [true, 'Csv can not be empty']
    },
    config: {
        type: Object,
        required: [true, 'Config can not be empty']
    },
    label: {
        type: String,
        required: [true, 'Please fill label']
    },
    active: {
        type: Boolean,
        default: true
    }
});

const MasterData = mongoose.model('MasterData', masterDataSchema);
module.exports = MasterData;