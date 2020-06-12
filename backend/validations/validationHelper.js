const AWS = require("aws-sdk");

// Enter copied or downloaded access id and secret here
const ID = "AKIAWX7WP3353JU5VN7W";
const SECRET = "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";

// Enter the name of the bucket that you have created here
const BUCKET_NAME = "rimbun-datasets";


// Initializing S3 Interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


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

validation.getFile = async ({files, body}) => {
    try{
        let { file, config } = files;
        const fileType = extractFileType(file.name);
        // file = masterDataParser[fileType] ? masterDataParser[fileType](file) : '';
        file =  await uploadFile(file);
        console.log('file location after upload====================================================>', file);
        config = config ? JSON.parse(config.data) : JSON.parse(body.config)||{};
        return { file, fileType, config };
    }catch(error){
        return {};
    }
}

const uploadFile = async (file) => {

        // Read content from the file
        const fileContent = file.data;

        // Setting up S3 upload parameters
        const params = {
            Bucket: BUCKET_NAME,
            Key: 'sample2561', // File name you want to save as in S3
            Body: fileContent
        };
        try {
            const data = await s3.upload(params).promise()
            console.log('promise response===*********>', data);
            return data.Location;
        } catch (err) {
            console.log('ERROR in UPLOAD ON S3===========', err);
            throw err;
        }

        // Uploading files to the bucket
        // await s3.upload(params, function (err, data) {
        //     if (err) {
        //         console.log('ERROR in UPLOAD ON S3===========', err);
        //         throw err;
        //     }
        //     console.log(`File uploaded successfully==>. ${data.Location}`);
        //     return data.Location;
        // });

 
};

module.exports = validation;