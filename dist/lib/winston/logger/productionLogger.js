"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionLogger = void 0;
var winston_1 = require("winston");
var standardLogFormat_1 = require("../format/standardLogFormat");
var productionLogger = winston_1.createLogger({
    level: 'debug',
    format: standardLogFormat_1.standardLogFormat,
    defaultMeta: { service: 'apollo-auth' },
    transports: [
        new winston_1.transports.File({ filename: './log/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: './log/combined.log' }),
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
    ],
});
exports.productionLogger = productionLogger;
