const validation = {};

validation.parseValidationErrors = (errors) => {
    try{
        const currentValue = errors[0];
        return currentValue.message;
    }catch(err){
        return 'Validation Error';
    }
};

validation.getFile = ({files}) => {
    try{
        let { csv, config } = files;
        csv = csv.data.toString('utf8');
        config = config ? JSON.parse(files.config.data) : {};
        return { csv, config };
    }catch(error){
        return {};
    }
}
module.exports = validation;