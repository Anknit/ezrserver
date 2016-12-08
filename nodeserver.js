'use_strict';

const PORT = 8080;
const APP_VERSION = 'v0.1';
const DB_VERSION = 'v1';
const ENVIRONMENT = 'DEVELOPMENT';


var http = require('http'),
    util = require('util'),
    querystring = require('querystring'),
    ezrClass = require('./ezrClass');

//We need a function which handles requests and send response
function handleRequest(req, res) {
    switch (req.method) {
    case 'GET':
        switch (req.url) {
        case '/':
            res.writeHead(501, "Not implemented", {
                'Content-Type': 'text/html'
            });
            res.end('<html><head><title>501 - Not implemented</title></head><body><h1>Not implemented!</h1></body></html>');
            break;
        case '/createVehicleCategories':
            var ezrObj = new ezrClass(ENVIRONMENT, DB_VERSION);
                ezrObj.setDefaultVehicleCategories(function(){
                    res.writeHead(200, "OK", {
                        'Content-Type': 'text/html'
                    });
                    res.end('<html><head><title>Test Page</title></head><body><h1>Success</h1></body></html>');
                }, function(error){
                    res.writeHead(200, "OK", {
                        'Content-Type': 'text/html'
                    });
                    res.end('<html><head><title>Test Page</title></head><body><h1>Failed to set default categories</h1></body></html>');
                });
            break;
        default:
            res.writeHead(404, "Not found", {
                'Content-Type': 'text/html'
            });
            res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
            break;
        }
        break;
    case 'POST':
        break;
    case 'DELETE':
        break;
    case 'PUT':
        break;
    default:
        break;
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});