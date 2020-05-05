const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { logger } = require('./core/logger');
dotenv.config({
    path: './.env'
});

process.on('uncaughtException', err => {
    logger.error(`UNCAUGHT EXCEPTION!!! shutting down... : ${JSON.stringify(err)}`);
    process.exit(1);
});

const app = require('./app');

const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect the database
mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    logger.info('DB connection Successfully!');
    // Start the server
    const port = process.env.PORT;
    app.listen(port, () => {
        logger.info(`Application is running on port ${port}`);
    });
});

process.on('unhandledRejection', err => {
    logger.error(`UNCAUGHT EXCEPTION!!! shutting down... : ${JSON.stringify(err)}`);
    server.close(() => {
        process.exit(1);
    });
});