const validation = {};
validation.parseValidationErrors = function (errors) {
    try{
        const currentValue = errors[0];
        return currentValue.message;
    }catch(err){
        return 'Validation Error';
    }
};

module.exports = validation;