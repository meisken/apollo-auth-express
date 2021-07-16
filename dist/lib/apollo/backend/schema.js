"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var graphql_tools_1 = require("graphql-tools");
var lodash_1 = require("lodash");
var UserResolver_1 = require("./resolvers/User/UserResolver");
var UserTypeDefs_1 = require("./typeDefs/User/UserTypeDefs");
var Query = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    _empty: String\n  }\n  type Mutation {\n    _empty: String\n  }\n"], ["\n  type Query {\n    _empty: String\n  }\n  type Mutation {\n    _empty: String\n  }\n"])));
var resolvers = {};
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [Query, UserTypeDefs_1.UserTypeDefs],
    resolvers: lodash_1.merge(resolvers, UserResolver_1.UserResolvers),
});
exports.schema = schema;
var templateObject_1;
