'use_strict';

const PORT = 8080;
const APP_VERSION = 'v0.1';
const DB_VERSION = 'v1';
const ENVIRONMENT = 'DEVELOPMENT';


var util = require('util'),
    querystring = require('querystring'),
    url = require('url'),
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
                httpObj.okStatus(req, res, 'Success');
            }, function(error){
                httpObj.okStatus(req, res, 'Failure');
            });
            break;
        case '/auth/verifyToken':
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            ezrObj.verifyLoginToken(query, function(response) {
                httpObj.okStatus(req, res, JSON.stringify(response));
            }, function (error){
                
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