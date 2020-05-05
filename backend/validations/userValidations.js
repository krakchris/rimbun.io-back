const validationHelper = require('./validationHelper');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const AppError = require('../utils/appError');
const validateRequest = (schema, req, res, next) => {
    const { body: data } = req;
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if(valid)  return next();
    return next(new AppError(401, 'fail', validationHelper.parseValidationErrors(validate.errors)), req, res, next);
};

const validateSignUp = (req, res, next) => {
    const schema = {
        type: "object",
        required: ["name", "email", "password", "passwordConfirm", "role"],
        properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            passwordConfirm: { type: "string" },
            role: { type: "string" }
        }
    }
    validateRequest(schema, req, res, next);
}

module.exports = {
    validateSignUp
}
