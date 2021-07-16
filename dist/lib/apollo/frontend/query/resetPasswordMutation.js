"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordMutation = void 0;
var client_1 = require("@apollo/client");
var resetPasswordMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation Login($token: String!, $newPassword: String!){\n        resetPassword(token: $token,newPassword: $newPassword)\n    }\n"], ["\n    mutation Login($token: String!, $newPassword: String!){\n        resetPassword(token: $token,newPassword: $newPassword)\n    }\n"])));
exports.resetPasswordMutation = resetPasswordMutation;
var templateObject_1;
