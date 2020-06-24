const uploadFile = require('../utils/upload');

const validation = {};

validation.parseValidationErrors = (errors) => {
    try{
        const currentValue = errors[0];
        return currentValue.message;
    }catch(err){
        return 'Validation Error';
    }
};

const extractFileType = (fileName) => {
    try{
        return fileName.split('.')[1]
    }catch(error){
        return 'csv';
    }
}

validation.getFile = async ({files, body}) => {
    try{
        let { file, config } = files;
        const fileType = extractFileType(file.name);
        file = await uploadFile(file, fileType);
        config = config ? JSON.parse(config.data) : JSON.parse(body.config)||{};
        return { file, fileType, config };
    }catch(error){
        return {};
    }
}


module.exports = validation;
