"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expireAt = void 0;
var expireAt = function (sec) {
    var now = new Date();
    var time = now.getTime();
    now.setTime(time + sec * 1000);
    return now;
};
exports.expireAt = expireAt;
