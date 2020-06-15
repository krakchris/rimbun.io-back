
const AWS = require("aws-sdk");
const cryptoRandomString = require("crypto-random-string");


// Enter copied or downloaded access id and secret here
const ID = process.env.BUCKET_ACCESS_ID;
const SECRET = process.env.BUCKET_SECRET;

// Enter the name of the bucket that you have created here
const BUCKET_NAME = process.env.BUCKET_NAME;


// Initializing S3 Interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});



const uploadFile = async (file) => {
    if (!file) return null;

    // Read content from the file
    const fileContent = file.data;
    let fileName = cryptoRandomString({ length: 10 });
    fileName = `${fileName}.csv`;

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    try {
        const data = await s3.upload(params).promise()
        if (data.Location) return fileName; else return null;
    } catch (err) {
        throw err;
    }



};


module.exports = uploadFile;