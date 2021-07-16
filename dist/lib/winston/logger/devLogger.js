"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLogger = void 0;
var winston_1 = require("winston");
var devLogFormat_1 = require("../format/devLogFormat");
var devLogger = winston_1.createLogger({
    level: 'debug',
    format: devLogFormat_1.devLogFormat,
    defaultMeta: { service: 'apollo-auth' },
    transports: [
        new winston_1.transports.Console(),
    ],
});
exports.devLogger = devLogger;
