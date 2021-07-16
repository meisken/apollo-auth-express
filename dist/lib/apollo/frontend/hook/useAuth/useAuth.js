"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloAuthProvider = exports.useAuth = void 0;
var client_1 = require("@apollo/client");
var react_1 = require("react");
var react_2 = require("react");
var query_1 = require("../../query");
var AuthContext = react_1.createContext(undefined);
var useAuth = function () {
    var context = react_2.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    else {
        return context;
    }
};
exports.useAuth = useAuth;
var ApolloAuthProvider = function (_a) {
    var children = _a.children, LoadingComponents = _a.LoadingComponents, _b = _a.ableLoading, ableLoading = _b === void 0 ? false : _b;
    var _c = client_1.useQuery(query_1.isLoggedInQuery), data = _c.data, loading = _c.loading;
    var _d = react_1.useState(""), refreshToken = _d[0], setRefreshToken = _d[1];
    var register = client_1.useMutation(query_1.registerMutation)[0];
    var _login = client_1.useMutation(query_1.loginMutation, { refetchQueries: [{ query: query_1.isLoggedInQuery }] })[0];
    var confirmUser = client_1.useMutation(query_1.confirmUserMutation)[0];
    var forgotPassword = client_1.useMutation(query_1.forgotPasswordMutation)[0];
    var resetPassword = client_1.useMutation(query_1.resetPasswordMutation)[0];
    var logout = client_1.useMutation(query_1.logoutMutation, { refetchQueries: [{ query: query_1.isLoggedInQuery }] })[0];
    var logoutAll = client_1.useMutation(query_1.logoutAllMutation, { refetchQueries: [{ query: query_1.isLoggedInQuery }] })[0];
    var updateUserInfo = client_1.useMutation(query_1.updateUserInfoMutation, { refetchQueries: [{ query: query_1.isLoggedInQuery }] })[0];
    var login = function (option) {
        var promise = new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
            var result, err_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _login(option)];
                    case 1:
                        result = _c.sent();
                        if (((_a = result.data) === null || _a === void 0 ? void 0 : _a.login.refreshToken)) {
                            setRefreshToken((_b = result.data) === null || _b === void 0 ? void 0 : _b.login.refreshToken);
                        }
                        resolve(result);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _c.sent();
                        reject(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return promise;
    };
    if (!LoadingComponents) {
        LoadingComponents = (<div>
                now loading......
            </div>);
    }
    var value = {
        user: data === null || data === void 0 ? void 0 : data.isLoggedIn,
        refreshToken: refreshToken,
        loading: loading,
        setRefreshToken: setRefreshToken,
        register: register,
        login: login,
        confirmUser: confirmUser,
        forgotPassword: forgotPassword,
        resetPassword: resetPassword,
        logout: logout,
        logoutAll: logoutAll,
        updateUserInfo: updateUserInfo
    };
    return loading && ableLoading ? LoadingComponents : (<AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>);
};
exports.ApolloAuthProvider = ApolloAuthProvider;
