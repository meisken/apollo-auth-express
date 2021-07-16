"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
var cookie = require("cookie");
var setCookie = function (res) {
    return function (cookies) {
        var cookieArray = [];
        if (Array.isArray(cookies)) {
            cookieArray = cookies;
        }
        else {
            cookieArray = [cookies];
        }
        var combinedCookies = [];
        cookieArray.forEach(function (_a) {
            var name = _a.name, value = _a.value, options = _a.options;
            //res.cookie(name,value,options);
            combinedCookies.push(cookie.serialize(name, value, options));
        });
        res.setHeader("Set-Cookie", combinedCookies);
    };
};
exports.setCookie = setCookie;
