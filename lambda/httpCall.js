const http = require('http')
module.exports.callAPI = (params) => {
    return new Promise((resolve, reject)=>{
        
        var options = {
          'method': 'POST',
          'hostname': params.host,
          'port': params.port,
          'path': params.path,
          'headers': {
            'Content-Type': 'application/json'
          },
          'maxRedirects': 20
        };
    
        var req = http.request(options, function (res) {
          var chunks = [];
        
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            resolve(body.toString());
          });
        
          res.on("error", function (error) {
            reject(error);
          });
        });
        
        var postData = JSON.stringify(params.body);
        
        req.write(postData);
        
        req.end(); 
    });
}
