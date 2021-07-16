"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = void 0;
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
exports.getCookie = getCookie;
