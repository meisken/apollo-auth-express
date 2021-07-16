"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameCheck = void 0;
var hasSymbol_1 = require("../../../both/hasSymbol");
var hasWhiteSpace_1 = require("../../../both/hasWhiteSpace");
var usernameCheck = function (username) {
    var promise = new Promise(function (resolve, reject) {
        if (hasWhiteSpace_1.hasWhiteSpace(username)) {
            reject(new Error("Username cannot be left blank"));
            return;
        }
        if (hasSymbol_1.hasSymbol(username)) {
            reject(new Error("Username cannot contain symbol"));
            return;
        }
        resolve();
    });
    return promise;
};
exports.usernameCheck = usernameCheck;
