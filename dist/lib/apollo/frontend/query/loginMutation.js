"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMutation = void 0;
var client_1 = require("@apollo/client");
var loginMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation Login($email: String!, $password: String!){\n        login(email:$email,password:$password){\n            user{\n                email,\n                id,\n                username,\n                admin,\n                confirmed,\n                pictureUrl\n            }\n            refreshToken\n        }\n    }\n"], ["\n    mutation Login($email: String!, $password: String!){\n        login(email:$email,password:$password){\n            user{\n                email,\n                id,\n                username,\n                admin,\n                confirmed,\n                pictureUrl\n            }\n            refreshToken\n        }\n    }\n"])));
exports.loginMutation = loginMutation;
var templateObject_1;
