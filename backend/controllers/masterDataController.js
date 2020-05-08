const csvtojson = require("csvtojson");
const fs = require('fs')
const results = [];
exports.uploadMasterData = (req, res, next) => {
    csvData = req.files.data.data.toString('utf8');
    return csvtojson().fromString(csvData).then(json => 
        {return res.status(201).json({csv:csvData, json:json})})
}