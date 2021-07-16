"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLogFormat = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, printf = winston_1.format.printf, colorize = winston_1.format.colorize, errors = winston_1.format.errors;
var logFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, stack = _a.stack;
    return level + ": " + (stack || message);
});
var devLogFormat = combine(colorize(), errors({ stack: true }), logFormat);
exports.devLogFormat = devLogFormat;
