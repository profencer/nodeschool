//var goog = require('closure').Closure({CLOSURE_BASE_PATH: 'closure-library\\closure\\goog\\'});
var express = require('express');

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var app = express();
//app.set('view engine', 'ejs');
app.get("/", function(req, res){
res.render('eshop.ejs', {
layout:false,
locals: { errorMessage: "Error: password нана." }
});
});
app.listen(port,ipaddress);
/*http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  //if(uri =="/"){ uri+="index.html";}
  
  console.log(filename);
  fs.stat(filename, function(err,exists) {
  
    if(!exists || err) {
	debugger;
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }  
	if(!err){
	if (fs.statSync(filename).isDirectory()) filename += "index.html";
		console.log(filename);
		fs.readFile(filename, function(err, file) {
		  if(err) {        
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(err + "\n");
			response.end();
			return;
		  }
		  
		});
		if(filename.indexOf('.html') != -1 || filename.indexOf('.jpg') != -1 || filename.indexOf('.png') != -1 ){ //req.url has the pathname, check if it conatins '.html'

		  fs.readFile(filename, function (err, data) {
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			response.end();
		  });

		}
		if(filename.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

		  fs.readFile(filename, function (err, data) {
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			response.write(data);
			response.end();
		  });

		}
		if(filename.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

		  fs.readFile(filename, function (err, data) {
			if (err) console.log(err);
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.write(data);
			response.end();
		  });
		}
	}
  });
}).listen(port,ipaddress); */
console.log("Static file server running at\n  => http://"+ ipaddress +":" + port + "/\nCTRL + C to shutdown");