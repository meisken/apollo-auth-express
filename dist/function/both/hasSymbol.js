"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSymbol = void 0;
function hasSymbol(value) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(value)) {
        return true;
    }
    else {
        return false;
    }
}
exports.hasSymbol = hasSymbol;
