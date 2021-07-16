"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToken = void 0;
var mongoose_1 = require("mongoose");
var tokenPrefix_1 = require("../../../function/backend/setToken/tokenPrefix");
var objectToArray_1 = require("../../../function/both/objectToArray");
var UserTokenSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        require: [true, "User id must be provided"]
    },
    uid: {
        type: String,
        unique: true,
        require: [true, "Uid must be provided"]
    },
    ip: String,
    type: {
        type: String,
        require: [true, "token type must be provided"],
        enum: objectToArray_1.objectToArray(tokenPrefix_1.tokenPrefix)
    },
    expireAt: Date
}, { timestamps: true });
UserTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
var UserToken = mongoose_1.models.UserToken || mongoose_1.model('UserToken', UserTokenSchema);
exports.UserToken = UserToken;
