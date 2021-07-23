"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookiesConfig = void 0;
var cookiesConfig = process.env.NODE_ENV === "production" ? {
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true
} : {
    path: "/",
    httpOnly: true
};
exports.cookiesConfig = cookiesConfig;
