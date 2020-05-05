const { callAPI } = require('./httpCall');
const { createAdminUserApi, users } = require("./config.json");
const { host, port, path } = createAdminUserApi;
users.forEach(user=>{
    callAPI({
        host,
        port,
        path,
        body: user
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    });
})