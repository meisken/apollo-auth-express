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
exports.getUserWithRefreshToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var setToken_1 = require("../../../function/backend/setToken");
var Token_1 = require("../schema/Token");
var User_1 = require("../schema/User");
var getUserWithRefreshToken = function (_a) {
    var token = _a.token, inComingIp = _a.inComingIp;
    var promise = new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var decodedToken, userToken, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    decodedToken = jsonwebtoken_1.verify(token, setToken_1.tokenPrefix.refresh + process.env.SECRET);
                    if (!decodedToken) return [3 /*break*/, 5];
                    return [4 /*yield*/, Token_1.UserToken.findOne({ uid: decodedToken.uid, type: setToken_1.tokenPrefix.refresh, ip: inComingIp })];
                case 1:
                    userToken = _a.sent();
                    if (!userToken) return [3 /*break*/, 3];
                    return [4 /*yield*/, User_1.User.findById(userToken.userId)];
                case 2:
                    user = _a.sent();
                    user ? resolve(user) : reject(new Error("User not found"));
                    return [3 /*break*/, 4];
                case 3:
                    reject(new Error("Invalid login token, please login again"));
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    reject(new Error("Invalid login token or expired, please login again"));
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    reject(err_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    return promise;
};
exports.getUserWithRefreshToken = getUserWithRefreshToken;
