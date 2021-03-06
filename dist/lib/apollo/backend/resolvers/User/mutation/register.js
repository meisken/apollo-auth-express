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
exports.register = void 0;
var sendMail_1 = require("../../../../../nodemailer/sendMail");
var setToken_1 = require("../../../../../../function/backend/setToken");
var passwordCheck_1 = require("../../../../../../function/backend/validation/passwordCheck");
var User_1 = require("../../../../../mongodb/schema/User");
var usernameCheck_1 = require("../../../../../../function/backend/validation/usernameCheck");
var winston_1 = require("../../../../../winston");
var register = function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
    var email, username, password, hashedPassword, user, savedUser, confirmationToken, sendMailResult, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = args.email, username = args.username, password = args.password;
                return [4 /*yield*/, passwordCheck_1.passwordCheck(password)];
            case 1:
                hashedPassword = _a.sent();
                return [4 /*yield*/, usernameCheck_1.usernameCheck(username)];
            case 2:
                _a.sent();
                user = new User_1.User({ email: email, username: username, password: hashedPassword, admin: false, confirmed: false, pictureUrl: "" });
                _a.label = 3;
            case 3:
                _a.trys.push([3, 7, , 8]);
                return [4 /*yield*/, user.save()];
            case 4:
                savedUser = _a.sent();
                return [4 /*yield*/, setToken_1.setConfirmationToken({ userId: savedUser.id, expiresIn: 60 * 15 })];
            case 5:
                confirmationToken = _a.sent();
                return [4 /*yield*/, sendMail_1.sendMail({ email: email, token: confirmationToken, temple: "confirm" })];
            case 6:
                sendMailResult = _a.sent();
                winston_1.logger.info(JSON.stringify(sendMailResult));
                return [2 /*return*/, true];
            case 7:
                err_1 = _a.sent();
                console.log(err_1);
                if (err_1.code === 11000) {
                    throw new Error("The email address has been registered");
                }
                winston_1.logger.error(err_1);
                return [2 /*return*/, false];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
