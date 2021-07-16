"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUserMutation = void 0;
var client_1 = require("@apollo/client");
var confirmUserMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation ConfirmUser($token: String!){\n        confirmUser(token: $token)\n    }\n"], ["\n    mutation ConfirmUser($token: String!){\n        confirmUser(token: $token)\n    }\n"])));
exports.confirmUserMutation = confirmUserMutation;
var templateObject_1;
