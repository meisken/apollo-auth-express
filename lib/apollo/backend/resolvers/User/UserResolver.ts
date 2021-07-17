import { isLoggedIn,getUser,isValidForgotPasswordToken } from "./query/index"
import {
    register,
    login,
    confirmUser,
    logout,
    logoutAll,
    forgotPassword,
    resetPassword,
    updateUserInfo
} from "./mutation/index"

import { GraphQLUpload } from "apollo-server-express"
const UserResolvers = {
    Upload: GraphQLUpload as any,
    Query: {
        getUser,
        isLoggedIn,
        isValidForgotPasswordToken
    },
    Mutation: {
        register,
        login,
        confirmUser,
        logout,
        logoutAll,
        forgotPassword,
        resetPassword,
        updateUserInfo

    }
}

export { UserResolvers }


