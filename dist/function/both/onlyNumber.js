"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyNumber = void 0;
var onlyNumber = function (string) {
    return /^\d+$/.test(string);
};
exports.onlyNumber = onlyNumber;
