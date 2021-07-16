import { gql } from "apollo-server-express"



const UserTypeDefs = gql`
  
    type User{
        id: ID,
        username: String,
        email: String,
        admin: Boolean,
        confirmed: Boolean,
        pictureUrl: String
        # password: String!
    }
    type AuthPayload{
        user: User,
        refreshToken: String
    }
    extend type Query {
        getUser(id: ID!): User,
        isLoggedIn(accessToken: String,ip: String): User,
        isValidForgotPasswordToken(forgotPasswordToken: String): Boolean,
    }
    extend type Mutation {
        register(username: String, email: String, password: String): Boolean,
        login(email: String, password: String): AuthPayload,
        confirmUser(token: String): Boolean,
        forgotPassword(email: String): Boolean,
        resetPassword(token: String,newPassword: String): Boolean,
        logout: Boolean,
        logoutAll: Boolean,
        updateUserInfo(
            refreshToken: String
            username: String,
            password: String
        ): User,
        
        
    } 

`

export { UserTypeDefs }