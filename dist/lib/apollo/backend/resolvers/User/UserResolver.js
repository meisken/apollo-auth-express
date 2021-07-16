"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolvers = void 0;
var index_1 = require("./query/index");
var index_2 = require("./mutation/index");
var UserResolvers = {
    Query: {
        getUser: index_1.getUser,
        isLoggedIn: index_1.isLoggedIn,
        isValidForgotPasswordToken: index_1.isValidForgotPasswordToken
    },
    Mutation: {
        register: index_2.register,
        login: index_2.login,
        confirmUser: index_2.confirmUser,
        logout: index_2.logout,
        logoutAll: index_2.logoutAll,
        forgotPassword: index_2.forgotPassword,
        resetPassword: index_2.resetPassword,
        updateUserInfo: index_2.updateUserInfo
    }
};
exports.UserResolvers = UserResolvers;
