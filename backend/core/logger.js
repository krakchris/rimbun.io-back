const constants     = require('../constant');
const winston       = require('winston');
const moment        = require('moment');
const nodeEnv       = process.env.NODE_ENV || 'development';
const httpContext   = require('express-http-context');

const logFormatter = (options) => {
    return JSON.stringify(Object.assign({},{
        timestamp   : moment().format('YYYY-MM-DD hh:mm:ss'),
        label       : options.label,
        level       : options.level.toUpperCase(),
        message     : options.message ? options.message : '',
    }, options.meta, httpContext.get('requestParams')) )
}

const transportConsole = new winston.transports.Console({
    level          : constants.logging.consoleLevel,
    label          : constants.logging.label,
    handleException: true,
    json           : false,
    colorize       : true,
    formatter      : logFormatter
})

const transportFile = new (winston.transports.File)({
    level          : constants.logging.fileLevel,
    label          : constants.logging.label,
    name           : 'log_file',
    filename       : constants.paths.log + 'rimbunIo-' + nodeEnv + '-' + moment().format('YYYY_MM_DD') + '.log',
    handleException: true,
    json           : false,
    maxSize        : 52428800,
    maxFiles       : 10,
    prettyPrint    : true,
    formatter      : logFormatter
});

const logger = new (winston.Logger)({
    emitErrs  : false,
    transports: [
        transportConsole,
        transportFile
    ]
});

module.exports = {
    logger: logger
};
