"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfirmationUrl = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var createConfirmationUrl = function (userId) {
    if (userId) {
        var token = jsonwebtoken_1.sign({ userId: userId }, process.env.SECRET, { expiresIn: 60 * 15 });
        return token;
    }
    else {
        console.log("please provide a userId");
        return null;
    }
};
exports.createConfirmationUrl = createConfirmationUrl;
