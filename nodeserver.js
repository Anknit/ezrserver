'use_strict';

const PORT = 8080;
const APP_VERSION = 'v0.1';
const DB_VERSION = 'v1';
const ENVIRONMENT = 'DEVELOPMENT';


var util = require('util'),
    querystring = require('querystring'),
    httpClass = require('./httpClass'),
    ezrClass = require('./ezrClass');

//We need a function which handles requests and send response
function httpReqHandler(req, res) {
    switch (req.method) {
    case 'GET':
        switch (req.url) {
        case '/':
            httpObj.notImplemented(req, res);
            break;
        case '/createVehicleCategories':
            ezrObj.setDefaultVehicleCategories(function(){
                httpObj.okStatus(req, res, 'status');
            }, function(error){
                httpObj.okStatus(req, res, 'Failure');
            });
            break;
        default:
            httpObj.notFound(req, res);
            break;
        }
        break;
    case 'POST':
        httpObj.notImplemented(req, res);
        break;
    case 'DELETE':
        httpObj.notImplemented(req, res);
        break;
    case 'PUT':
        httpObj.notImplemented(req, res);
        break;
    default:
        break;
    }
}

var httpObj = new httpClass(PORT, httpReqHandler);
var ezrObj = new ezrClass(ENVIRONMENT, DB_VERSION);