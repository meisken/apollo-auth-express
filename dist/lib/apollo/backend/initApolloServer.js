"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApolloServerContext_1 = require("../../apollo/backend/ApolloServerContext");
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = require("./schema");
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var connection_1 = require("../../mongodb/connection");
var apolloServer = new apollo_server_express_1.ApolloServer({
    schema: schema_1.schema,
    validationRules: [graphql_depth_limit_1.default(5)],
    context: ApolloServerContext_1.context
});
var handler = apolloServer.createHandler({ path: "/api/graphql" });
exports.default = connection_1.connectDb(handler);
