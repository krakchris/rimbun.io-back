module.exports = {
    logging: {
        label : "RIMBUN",
        consoleLevel: process.env.loggingConsoleLevel || "debug",
        fileLevel : process.env.loggingfileLevel || "debug"
    },
    paths: {
        log: process.env.logPath ||`asset/log/`
    },
    allowedOrigins: [
        'http://localhost:3000',
        'http://localhost:4000',
        'http://locahost:5000',
        'http://ubuntu@ec2-54-196-69-114.compute-1.amazonaws.com:8080',
        'http://ubuntu@ec2-54-196-69-114.compute-1.amazonaws.com:5000',
        'http://dev.rimbun.io:5000',
        'http://dev.rimbun.io:3000'
    ]
}