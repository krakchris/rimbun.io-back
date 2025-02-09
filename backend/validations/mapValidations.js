const { parseValidationErrors } = require('./validationHelper');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const AppError = require('../utils/appError');
const validateRequest = (schema, req, res, next) => {
    const { body: data } = req;
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if(valid)  return next();
    return next(new AppError(401, 'error', parseValidationErrors(validate.errors)), req, res, next);
};

const validateMap = (req, res, next) => {
    const schema = {
        type: "object",
        required: ["name", "master"],
        properties: {
            name: { type: "string" },
            config: { type: "object" },
            master: { type: "array"}
        }
    }
    validateRequest(schema, req, res, next);
}

const validateShareMap = (req, res, next) => {
    const schema = {
        type: "object",
        required: ["userIds"],
        properties: {
            userIds: { type: "array" }
        }
    }
    validateRequest(schema, req, res, next);
}
module.exports = {
    validateMap,
    validateShareMap
}