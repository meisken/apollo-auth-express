import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { schema } from "./schema"
import { context } from "./ApolloServerContext"

const apolloServer = new ApolloServer({ 
    schema,
    validationRules: [depthLimit(5)],
    context,
    uploads:{
        maxFiles: 1,
        maxFileSize: 5000000,
    }
});



export { apolloServer }