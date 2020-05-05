const { callAPI } = require('./httpCall');
const { createAdminUserApi, users } = require("./config.json");
const { host, port, path } = createAdminUserApi;
users.forEach(user=>{
    callAPI({
        host,
        port,
        path,
        body: {"name":"Tanveer","email":"tanveer13@yopmail.com","password":"sach4327","passwordConfirm":"sach4327","role":"admin"}
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    });
})