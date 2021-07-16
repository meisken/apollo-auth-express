"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIp = void 0;
var getIp = function (req) {
    var forwarded = req.headers['x-forwarded-for'];
    var ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
    }
    return ip;
};
exports.getIp = getIp;
