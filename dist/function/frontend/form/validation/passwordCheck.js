"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordCheck = void 0;
var hasNumber_1 = require("../../../both/hasNumber");
var onlyNumber_1 = require("../../../both/onlyNumber");
var passwordCheck = function (password) {
    var promise = new Promise(function (resolve, reject) {
        if (password === "") {
            reject(new Error("password can not be empty"));
            return;
        }
        if (password.length < 6) {
            reject(new Error("Minimum password length is 6 characters"));
            return;
        }
        if (!hasNumber_1.hasNumber(password) || onlyNumber_1.onlyNumber(password)) {
            reject(new Error("The password must contains numbers and characters"));
            return;
        }
        resolve();
    });
    return promise;
};
exports.passwordCheck = passwordCheck;
