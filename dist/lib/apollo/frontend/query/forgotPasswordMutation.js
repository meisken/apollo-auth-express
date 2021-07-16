"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordMutation = void 0;
var client_1 = require("@apollo/client");
var forgotPasswordMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation ForgotPassword($email: String!){\n        forgotPassword(email: $email)\n    }\n"], ["\n    mutation ForgotPassword($email: String!){\n        forgotPassword(email: $email)\n    }\n"])));
exports.forgotPasswordMutation = forgotPasswordMutation;
var templateObject_1;
