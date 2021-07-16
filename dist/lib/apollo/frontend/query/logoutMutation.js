"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutMutation = void 0;
var client_1 = require("@apollo/client");
var logoutMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation Logout{\n        logout\n    }\n"], ["\n    mutation Logout{\n        logout\n    }\n"])));
exports.logoutMutation = logoutMutation;
var templateObject_1;
