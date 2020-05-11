const MasterData = require('../models/masterDataModel');
const base = require('./baseController');

exports.createOne = base.createOne(MasterData);