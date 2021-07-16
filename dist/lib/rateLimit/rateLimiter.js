"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
var getIp_1 = require("../../function/backend/getIp");
var RateLimit = require("express-rate-limit");
var MongoStore = require('rate-limit-mongo');
var limiter = new RateLimit({
    store: new MongoStore({
        uri: process.env.MONGODB_URL,
        expireTimeMs: 15 * 60 * 1000,
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
        // see Configuration section for more options and details
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    keyGenerator: function (req) {
        var ip = getIp_1.getIp(req);
        return ip;
    },
    delayMs: 0,
});
exports.limiter = limiter;
