//var goog = require('closure').Closure({CLOSURE_BASE_PATH: 'closure-library\\closure\\goog\\'});
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200, {"Content-Type": "charset=utf-8"});
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(port,ipaddress);

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");