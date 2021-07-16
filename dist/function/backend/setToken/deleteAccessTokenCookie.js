"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccessTokenCookie = void 0;
var cookiesConfig_1 = require("../cookie/cookiesConfig");
var deleteAccessTokenCookie = function (setCookie) {
    setCookie({
        name: "access-token",
        value: "deleted",
        options: __assign(__assign({}, cookiesConfig_1.cookiesConfig), { maxAge: -1 })
    });
};
exports.deleteAccessTokenCookie = deleteAccessTokenCookie;
