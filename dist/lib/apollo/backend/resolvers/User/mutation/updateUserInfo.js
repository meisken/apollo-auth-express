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
exports.updateUserInfo = void 0;
var passwordCheck_1 = require("../../../../../../function/backend/validation/passwordCheck");
var usernameCheck_1 = require("../../../../../../function/backend/validation/usernameCheck");
var uploadFile_1 = require("../../../../../fs/uploadFile");
var getUserWithRefreshToken_1 = require("../../../../../mongodb/function/getUserWithRefreshToken");
var User_1 = require("../../../../../mongodb/schema/User");
var winston_1 = require("../../../../../winston");
var logoutAll_1 = require("./logoutAll");
var removeFiles_1 = require("./../../../../../fs/removeFiles");
var updateUserInfo = function (_, _a, context) {
    var refreshToken = _a.refreshToken, username = _a.username, password = _a.password, picture = _a.picture;
    return __awaiter(void 0, void 0, void 0, function () {
        var inComingIp, userId, newUser, oldPictureUrl, _b, id, pictureUrl, err_1, isPasswordChanged, hashedPassword, destinationFolder, filenames, newPictureUrl, err_2, updatedUser, err_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    inComingIp = context.inComingIp;
                    newUser = {};
                    // basic info checking
                    if (!refreshToken) {
                        throw new Error("Login please");
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getUserWithRefreshToken_1.getUserWithRefreshToken({ token: refreshToken, inComingIp: inComingIp })];
                case 2:
                    _b = _c.sent(), id = _b.id, pictureUrl = _b.pictureUrl;
                    userId = id;
                    oldPictureUrl = pictureUrl;
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _c.sent();
                    throw (err_1);
                case 4:
                    if (!username && !password && !picture) {
                        throw new Error("There's no any new user Information");
                    }
                    if (!(username && username !== "")) return [3 /*break*/, 6];
                    return [4 /*yield*/, usernameCheck_1.usernameCheck(username)];
                case 5:
                    _c.sent();
                    newUser.username = username;
                    _c.label = 6;
                case 6:
                    isPasswordChanged = password && password !== "";
                    if (!isPasswordChanged) return [3 /*break*/, 8];
                    return [4 /*yield*/, passwordCheck_1.passwordCheck(password, userId)];
                case 7:
                    hashedPassword = _c.sent();
                    newUser.password = hashedPassword;
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 11, , 12]);
                    if (!picture) return [3 /*break*/, 10];
                    destinationFolder = "uploads/img/";
                    return [4 /*yield*/, uploadFile_1.uploadFile(picture, { fileType: "image", maxCount: 2, maxSize: 5, destinationFolder: "public/" + destinationFolder })];
                case 9:
                    filenames = _c.sent();
                    console.log(filenames);
                    newPictureUrl = "" + (destinationFolder + filenames[0]);
                    newUser.pictureUrl = newPictureUrl;
                    if (oldPictureUrl && newPictureUrl !== oldPictureUrl) {
                        removeFiles_1.removeFiles("public/" + oldPictureUrl);
                    }
                    _c.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_2 = _c.sent();
                    throw err_2;
                case 12:
                    _c.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, User_1.User.findByIdAndUpdate({ _id: userId }, newUser, { new: true })];
                case 13:
                    updatedUser = _c.sent();
                    if (!updatedUser) {
                        throw new Error("User not found");
                    }
                    if (isPasswordChanged) {
                        logoutAll_1.logoutAll(null, null, context);
                    }
                    return [2 /*return*/, updatedUser];
                case 14:
                    err_3 = _c.sent();
                    winston_1.logger.error(err_3);
                    return [2 /*return*/, null];
                case 15: return [2 /*return*/];
            }
        });
    });
};
exports.updateUserInfo = updateUserInfo;
