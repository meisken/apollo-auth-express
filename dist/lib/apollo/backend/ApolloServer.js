"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloServer = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var schema_1 = require("./schema");
var ApolloServerContext_1 = require("./ApolloServerContext");
var apolloServer = new apollo_server_express_1.ApolloServer({
    schema: schema_1.schema,
    validationRules: [graphql_depth_limit_1.default(5)],
    context: ApolloServerContext_1.context
});
exports.apolloServer = apolloServer;
