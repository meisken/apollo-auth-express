"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailCheck = void 0;
var isEmail = require('validator').isEmail;
var emailCheck = function (email) {
    var promise = new Promise(function (resolve, reject) {
        if (email === "") {
            reject(new Error("email can not be empty"));
            return;
        }
        if (!(isEmail(email))) {
            reject(new Error("Invalid email address"));
            return;
        }
        resolve();
    });
    return promise;
};
exports.emailCheck = emailCheck;
