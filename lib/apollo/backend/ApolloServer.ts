import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { schema } from "./schema"
import { context } from "./ApolloServerContext"

const apolloServer = new ApolloServer({ 
    schema,
    validationRules: [depthLimit(5)],
    context
});



export { apolloServer }