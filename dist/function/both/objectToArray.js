"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToArray = void 0;
var objectToArray = function (obj) {
    var resultArray = [];
    var objectKeys = Object.keys(obj);
    objectKeys.forEach(function (objKey) {
        resultArray.push(obj[objKey]);
    });
    return resultArray;
};
exports.objectToArray = objectToArray;
