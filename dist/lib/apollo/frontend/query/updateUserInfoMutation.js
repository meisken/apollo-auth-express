"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfoMutation = void 0;
var client_1 = require("@apollo/client");
var updateUserInfoMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation UpdateUserInfo($username: String, $password: String, $refreshToken: String!){\n        updateUserInfo(username: $username, password: $password, refreshToken: $refreshToken){\n            id\n            username\n            email\n            admin\n            confirmed\n            pictureUrl\n        }\n    }\n"], ["\n    mutation UpdateUserInfo($username: String, $password: String, $refreshToken: String!){\n        updateUserInfo(username: $username, password: $password, refreshToken: $refreshToken){\n            id\n            username\n            email\n            admin\n            confirmed\n            pictureUrl\n        }\n    }\n"])));
exports.updateUserInfoMutation = updateUserInfoMutation;
var templateObject_1;
