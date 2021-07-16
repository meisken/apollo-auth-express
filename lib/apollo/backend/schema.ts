import { gql } from "apollo-server-express"
import { makeExecutableSchema } from "graphql-tools"
import { merge } from 'lodash';
import { UserResolvers } from "./resolvers/User/UserResolver"
import { UserTypeDefs } from "./typeDefs/User/UserTypeDefs"

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
const resolvers = {};

const schema = makeExecutableSchema({
    typeDefs: [Query, UserTypeDefs],
    resolvers: merge(resolvers, UserResolvers),
    
})

export { schema }
