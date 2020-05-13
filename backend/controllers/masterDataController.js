const MasterData = require('../models/masterDataModel');
const base = require('./baseController');

exports.createOne = base.createOne(MasterData);
exports.getAll = base.getAll(MasterData);
exports.getOne = base.getOne(MasterData)
