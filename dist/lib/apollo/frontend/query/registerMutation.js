"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMutation = void 0;
var client_1 = require("@apollo/client");
var registerMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation Login($username: String!,$email: String!, $password: String!){\n        register(email: $email,password: $password,username: $username)\n    }\n"], ["\n    mutation Login($username: String!,$email: String!, $password: String!){\n        register(email: $email,password: $password,username: $username)\n    }\n"])));
exports.registerMutation = registerMutation;
var templateObject_1;
