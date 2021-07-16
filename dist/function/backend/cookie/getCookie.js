"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = void 0;
function getCookie(cookies, name) {
    if (typeof (cookies) === "string") {
        var v = cookies.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
    else {
        return cookies[name];
    }
}
exports.getCookie = getCookie;
