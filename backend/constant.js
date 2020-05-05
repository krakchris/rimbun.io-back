module.exports = {
    logging: {
        label : "RIMBUN",
        consoleLevel: process.env.loggingConsoleLevel || "debug",
        fileLevel : process.env.loggingfileLevel || "debug"
    },
    paths: {
        log: process.env.logPath ||`asset/log/`
    }
}