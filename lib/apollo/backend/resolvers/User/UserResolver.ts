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


const UserResolvers = {
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


