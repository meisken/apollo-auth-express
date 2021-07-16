"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidForgotPasswordTokenQuery = void 0;
var client_1 = require("@apollo/client");
var isValidForgotPasswordTokenQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query GetCurrentUser($forgotPasswordToken: String!){\n        isValidForgotPasswordToken(forgotPasswordToken: $forgotPasswordToken)\n    }\n"], ["\n    query GetCurrentUser($forgotPasswordToken: String!){\n        isValidForgotPasswordToken(forgotPasswordToken: $forgotPasswordToken)\n    }\n"])));
exports.isValidForgotPasswordTokenQuery = isValidForgotPasswordTokenQuery;
var templateObject_1;
