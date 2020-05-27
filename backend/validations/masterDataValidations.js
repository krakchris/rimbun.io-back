const validationHelper = require('./validationHelper');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const AppError = require('../utils/appError');
const validateRequest = (schema, req, res, next) => {
    const { body: data } = req;
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if(valid)  return next();
    return next(new AppError(401, 'error', validationHelper.parseValidationErrors(validate.errors)), req, res, next);
};

const validateMasterData = (req, res, next) => {
    Object.assign(req.body, validationHelper.getFile(req));
    const schema = {
        type: "object",
        required: ["file", "tagName", "config", "label"],
        properties: {
            file: { type: "string" },
            tagName: { type: "string" },
            config: { type: "object" },
            label: { type: "string" },
            creator: { type: "string" }
        }
    }
    validateRequest(schema, req, res, next);
}

module.exports = {
    validateMasterData
}