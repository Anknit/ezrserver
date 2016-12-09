'use strict';

/*!
 * Firebase Api
 * Copyright(c) 2017 Ankit Agarwal <ankitakkii24@gmail.com>
 * MIT Licensed
 */

/**
 * @module firebaseApi
 */

var firebaseAdmin = require("firebase-admin"),
    util = require("util");

function firebaseApi(privateKeyPath, databaseURL) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(privateKeyPath),
        databaseURL: databaseURL
    });
    this.databaseObj = firebaseAdmin.database();
    this.authObj = firebaseAdmin.auth();
};

firebaseApi.prototype.verifyAuthToken = function (idToken, success, failure) {
    this.authObj.verifyIdToken(idToken).then(function(decodedToken) {
        var uid = decodedToken.uid;
        success(decodedToken);
    }).catch(function(error) {
        failure(error);
    });
}

firebaseApi.prototype.DB_Append = function (path, data, callback) {
    var newDbEntry = this.databaseObj.ref(path).push();
    newDbEntry.set(data, callback);
}

firebaseApi.prototype.DB_Insert = function (path, data, callback) {
    this.databaseObj.ref(path).set(data, callback);
}

firebaseApi.prototype.DB_Update = function (path, data, callback) {
    this.databaseObj.ref(path).update(data, callback);
}

firebaseApi.prototype.DB_Read = function (path, callback) {
    this.databaseObj.ref(path).once("value", callback);
}

firebaseApi.prototype.DB_Watch = function (path, callback) {
    this.databaseObj.ref(path).on("value", callback);
}

firebaseApi.prototype.DB_StopWatch = function (path, callback) {
    this.databaseObj.ref(path).off("value", callback);
}

module.exports = firebaseApi;