const PORT = 8080;
const firebaseKeyPath = "config/ezgarage-a71b7-firebase-adminsdk-ukbue-d42780731d.json";
const firebaseDbUrl = "https://ezgarage-a71b7.firebaseio.com";

var http = require('http'),
    util = require('util'),
    firebaseApi = require('./firebaseApi'),
    firebaseObj = new firebaseApi(firebaseKeyPath, firebaseDbUrl);

//We need a function which handles requests and send response
function handleRequest(request, response) {
    if(request.url == '/createUserEntry') {
        firebaseObj.DB_Insert('development/nodeapi/users',{"name":"ankit"});
    }
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});