const masterDataParser = {
    "csv": (content) => {
        return content.data.toString('utf8');
    },
    "json": (content) => {
        return JSON.stringify(JSON.parse(content.data));
    },
    "geojson": (content) => {
        return JSON.stringify(JSON.parse(content.data));
    }
};

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

validation.getFile = ({files, body}) => {
    try{
        let { file, config } = files;
        const fileType = extractFileType(file.name);
        file = masterDataParser[fileType] ? masterDataParser[fileType](file) : '';
        config = config ? JSON.parse(config.data) : JSON.parse(body.config)||{};
        return { file, fileType, config };
    }catch(error){
        return {};
    }
}
module.exports = validation;