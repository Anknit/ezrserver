const firebaseKeyPath = "config/ezgarage-a71b7-firebase-adminsdk-ukbue-d42780731d.json";
const firebaseDbUrl = "https://ezgarage-a71b7.firebaseio.com";

var firebaseApi = require('./firebaseApi'),
    fileSystem = require('fs'),
    vehicleCategories = require('./dataConfig/vehicleCategories.json'),
    firebaseObj;


class ezrClass {
    constructor(env, version) {
        this.version = version || 'v1';
        this.environment = env || 'TESTING';
        this.dbRoot = this.environment + '/' + this.version + '/';
        firebaseObj = new firebaseApi(firebaseKeyPath, firebaseDbUrl, this.dbRoot);
    }
    setDefaultVehicleCategories(success, failure) {
        var path = this.dbRoot + 'vehicles/';
        var data = vehicleCategories;
        firebaseObj.DB_Insert(path, data, function (error) {
            if(error) {
                failure();
            } else {
                success();
            }
        });
    }
    
    verifyLoginToken(token, success, failure) {
        firebaseObj.verifyAuthToken(token, success, failure);
    }
    
    checkUserExist(userId, email, callback) {
        var output = {userExist: false};
        firebaseObj.DB_Read('users/list/' + userId, function(response) {
            if(response.val() !== null) {
                output.userExist = true;
                output.userData = response.val();
            }
            callback(output);
        });
    }
    
    addNewUser(userId, userData, callback) {
        var output = {userAdded: false};
        var curTime = new Date().getTime();
        var data = {"email": userData.email, "email_verified": userData.email_verified, "userid": userData.uid, "name": userData.name, "profilepic": userData.picture, "sign_in_provider": userData.firebase.sign_in_provider, "mobile_verified": false, "userType": "Customer", "userStatus": "Registered", "registrationTime": curTime};
        firebaseObj.DB_Insert('users/list/' + userId, data, function (error){
            if(!error) {
                output.userAdded = true;
                output.userData = data;
            }
            callback(output);
        });
    }
}

module.exports = ezrClass;