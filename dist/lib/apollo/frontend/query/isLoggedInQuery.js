"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInQuery = void 0;
var client_1 = require("@apollo/client");
var isLoggedInQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query GetCurrentUser($accessToken: String,$ip: String){\n        isLoggedIn(accessToken: $accessToken,ip: $ip){\n            id\n            username\n            email\n            admin\n            pictureUrl\n        }\n    }\n"], ["\n    query GetCurrentUser($accessToken: String,$ip: String){\n        isLoggedIn(accessToken: $accessToken,ip: $ip){\n            id\n            username\n            email\n            admin\n            pictureUrl\n        }\n    }\n"])));
exports.isLoggedInQuery = isLoggedInQuery;
var templateObject_1;
