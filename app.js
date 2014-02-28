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
  if(uri =="/"){ uri+="index.html";}
  if (fs.statSync(filename).isDirectory()) filename += 'index.html';
  console.log(filename);
  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    
    
    console.log(filename);
    fs.readFile(filename, function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
	  
    });
	   if(request.url.indexOf('.html') != -1 || request.url.indexOf('.jpg') != -1 || request.url.indexOf('.png') != -1 ){ //req.url has the pathname, check if it conatins '.html'

      fs.readFile(filename, function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
      });

    }

    if(request.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

      fs.readFile(filename, function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
      });

    }

    if(request.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

      fs.readFile(filename, function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });

    }
  });
}).listen(port,ipaddress);

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");