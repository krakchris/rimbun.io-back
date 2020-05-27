const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/userRoutes');
const masterDataRoutes = require('./routes/masterDataRoutes');
const mapRoutes = require('./routes/mapRoutes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();
const { allowedOrigins } = require('./constant')
const errMsg = require('./core/errorMessage');
// Allow Cross-Origin requests
app.use(cors({
    origin: function(origin, callback){
        return callback(null, true);
    }
}));
// app.use(cors({
//     origin: function(origin, callback){    // allow requests with no origin 
//       // (like mobile apps or curl requests)
//       if(!origin) return callback(null, true);    if(allowedOrigins.indexOf(origin) === -1){
//         var msg = 'The CORS policy for this site does not ' +
//                   'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }    return callback(null, true);
//     }
// }));

//set static directory
process.env.NODE_ENVIROMMENT == 'development' && app.use(express.static('public'));

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

//parsing multi-party form data
app.use(fileUpload());

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/masterData', masterDataRoutes)
app.use('/api/v1/map', mapRoutes)

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'error', errMsg['undefinedRoute']);
    next(err, req, res, next);
});

app.use(globalErrHandler);
module.exports = app;