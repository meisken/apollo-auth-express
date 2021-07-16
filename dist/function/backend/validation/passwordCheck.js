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
exports.passwordCheck = void 0;
var bcryptjs_1 = require("bcryptjs");
var User_1 = require("../../../lib/mongodb/schema/User");
var hasNumber_1 = require("../../both/hasNumber");
var onlyNumber_1 = require("../../both/onlyNumber");
var passwordCheck = function (password, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var promise;
    return __generator(this, function (_a) {
        promise = new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
            var hashedNewPassword, oldPassword, IsOldPassword, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!hasNumber_1.hasNumber(password) || onlyNumber_1.onlyNumber(password))) return [3 /*break*/, 1];
                        reject(new Error("The password must contains numbers and characters"));
                        return [3 /*break*/, 10];
                    case 1:
                        if (!(password.length < 6)) return [3 /*break*/, 2];
                        reject(new Error("Minimum password length is 6 characters"));
                        return [3 /*break*/, 10];
                    case 2: return [4 /*yield*/, bcryptjs_1.hash(password, 12)];
                    case 3:
                        hashedNewPassword = _a.sent();
                        if (!userId) return [3 /*break*/, 9];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, User_1.User.findById(userId)];
                    case 5:
                        oldPassword = (_a.sent()).password;
                        return [4 /*yield*/, bcryptjs_1.compare(password, oldPassword)];
                    case 6:
                        IsOldPassword = _a.sent();
                        if (IsOldPassword) {
                            reject(new Error("new password cannot be the same as old"));
                        }
                        else {
                            resolve(hashedNewPassword);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        reject(err_1);
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        resolve(hashedNewPassword);
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/, promise];
    });
}); };
exports.passwordCheck = passwordCheck;
