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
exports.login = void 0;
var bcryptjs_1 = require("bcryptjs");
var setToken_1 = require("../../../../../../function/backend/setToken");
var Blacklist_1 = require("../../../../../mongodb/schema/Blacklist");
var Token_1 = require("../../../../../mongodb/schema/Token");
var User_1 = require("../../../../../mongodb/schema/User");
var winston_1 = require("../../../../../winston");
var login = function (_, args, _a) {
    var setCookie = _a.setCookie, ip = _a.inComingIp;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, inBlacklist, loginAttempts, blockingTimestamps, now, valid, err_1, loggedInAccessToken, cookies, accessTokenCookie, refreshToken, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, User_1.User.findOne({ email: args.email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error("This email does not exist");
                    }
                    return [4 /*yield*/, Blacklist_1.Blacklist.findOne({ userId: user.id, ip: ip })];
                case 2:
                    inBlacklist = _b.sent();
                    if (inBlacklist) {
                        blockingTimestamps = inBlacklist.blockingTimestamps;
                        loginAttempts = inBlacklist.loginAttempts;
                        now = new Date();
                        if (now.getTime() < blockingTimestamps.getTime()) {
                            throw new Error("Your account has been blocked, Please try again later");
                        }
                    }
                    return [4 /*yield*/, bcryptjs_1.compare(args.password, user.password)];
                case 3:
                    valid = _b.sent();
                    if (!!valid) return [3 /*break*/, 8];
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, setToken_1.setBlacklist({ userId: user.id, expiresIn: 60 * 15, ip: ip, loginAttempts: loginAttempts })];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    winston_1.logger.error(err_1);
                    return [3 /*break*/, 7];
                case 7: throw new Error("Wrong password");
                case 8:
                    if (!user.confirmed) {
                        throw new Error("Please confirm your email address");
                    }
                    return [4 /*yield*/, Token_1.UserToken.findOne({ userId: user.id, type: setToken_1.tokenPrefix.access, ip: ip })];
                case 9:
                    loggedInAccessToken = _b.sent();
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 15, , 16]);
                    cookies = [];
                    return [4 /*yield*/, setToken_1.setAccessToken({
                            userId: user.id,
                            expiresIn: 60 * 60 * 24 * 3,
                            uid: (loggedInAccessToken === null || loggedInAccessToken === void 0 ? void 0 : loggedInAccessToken.uid) || undefined,
                            ip: ip,
                        })];
                case 11:
                    accessTokenCookie = _b.sent();
                    cookies.push(accessTokenCookie);
                    setCookie(cookies);
                    return [4 /*yield*/, setToken_1.setRefreshToken({ userId: user.id, expiresIn: 60 * 30, ip: ip })];
                case 12:
                    refreshToken = _b.sent();
                    if (!(loginAttempts && loginAttempts > 0)) return [3 /*break*/, 14];
                    return [4 /*yield*/, Blacklist_1.Blacklist.findOneAndDelete({ userId: user.id, ip: ip })];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14: return [2 /*return*/, {
                        user: user,
                        refreshToken: refreshToken
                    }];
                case 15:
                    err_2 = _b.sent();
                    winston_1.logger.error(err_2);
                    return [2 /*return*/, null];
                case 16: return [2 /*return*/];
            }
        });
    });
};
exports.login = login;
