"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardLogFormat = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, printf = winston_1.format.printf, colorize = winston_1.format.colorize, errors = winston_1.format.errors, json = winston_1.format.json;
var timezoned = function () {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Hongkong'
    });
};
// const logFormat = printf(({ level, message, timestamp,stack }) => {
//     return `${timestamp} ${level}: ${stack || message}`;
// });
var standardLogFormat = combine(timestamp({ format: timezoned }), errors({ stack: true }), json());
exports.standardLogFormat = standardLogFormat;
