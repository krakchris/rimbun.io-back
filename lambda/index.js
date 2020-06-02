exports.handler = async (event) => {
    const { callAPI } = require('./httpCall');
    const { users } = require("./config.json");
    const { createAdminUserApi } = require("./constant");
    const { host, port, path } = createAdminUserApi;
    const promises = await Promise.all(users.map(user=>{
        return callAPI({
                    host,
                    port,
                    path,
                    body: user
                });
    }));
    const response = {
        statusCode: 200,
        body: JSON.stringify(promises),
    };
    return response;
};
