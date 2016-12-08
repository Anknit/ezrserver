const firebaseKeyPath = "config/ezgarage-a71b7-firebase-adminsdk-ukbue-d42780731d.json";
const firebaseDbUrl = "https://ezgarage-a71b7.firebaseio.com";

var firebaseApi = require('./firebaseApi'),
    fileSystem = require('fs'),
    vehicleCategories = require('./dataConfig/vehicleCategories.json'),
    firebaseObj = new firebaseApi(firebaseKeyPath, firebaseDbUrl);

class ezrClass {
    constructor(env, version) {
        this.version = version || 'v1';
        this.environment = env || 'TESTING';
    }
    setDefaultVehicleCategories(success, failure) {
        var path = this.environment + '/' + this.version + '/vehicles/';
        var data = vehicleCategories;
        firebaseObj.DB_Insert(path, data, function (error) {
            if(error) {
                failure();
            } else {
                success();
            }
        });
    }
}

module.exports = ezrClass;