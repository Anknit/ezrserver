const PORT = 8080;
const APP_VERSION = 'v0.1';
const DB_VERSION = 'v1';
const ENVIRONMENT = 'DEVELOPMENT';

var express = require('express'),
    ezrClass = require('./ezrClass');

var expressApp = express();
var ezrObj = new ezrClass(ENVIRONMENT, DB_VERSION);

allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

expressApp.use(allowCrossDomain);

class httpClass {
    constructor(port){
        expressApp.listen(port, function () {
            console.log("Server listening on: http://localhost:%s", port);
        });
    }
}

expressApp.get('/user/verifyToken/:tokenid', function (req, res){
    var tokenid = req.params["tokenid"];
    var outputResponse = {tokenValid: false};
    ezrObj.verifyLoginToken(tokenid, function(response) {
        if (response.email) {
            // check user exist
            // if not insert in database
            ezrObj.checkUserExist(response.uid, response.email, function (output) {
                if(output.userExist) {
                    outputResponse.userData = output.userData;
                    outputResponse.status = 'success';
                    res.send(outputResponse);
                } else {
                    ezrObj.addNewUser(response.uid, response, function (data) {
                        if (data.userAdded) {
                            outputResponse.userData = data.userData;
                            outputResponse.status = 'success';
                            res.send(outputResponse);
                        } else {
                            outputResponse.status = 'failure';
                            res.send(outputResponse);
                        }
                    });
                }
            })
            outputResponse.tokenValid = true;
        } else {
            res.send(outputResponse);
        }
    }, function (error){
        res.send(error);
    });
});

var httpObj = new httpClass(PORT);

module.exports = httpClass;