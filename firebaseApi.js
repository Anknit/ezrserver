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
};

firebaseApi.prototype.DB_Insert = function (path, data, callback) {
    var newDbEntry = this.databaseObj.ref(path).push();
    newDbEntry.set(data, callback);
}

firebaseApi.prototype.DB_Update = function (path, data, callback) {
    this.databaseObj.ref(path).update(data, callback);
}

firebaseApi.prototype.DB_Read = function (path, callback) {
    this.databaseObj.ref(path).once("value", callback);
}

module.exports = firebaseApi;