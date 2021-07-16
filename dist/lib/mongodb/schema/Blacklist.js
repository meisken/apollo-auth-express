"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blacklist = void 0;
var mongoose_1 = require("mongoose");
var BlacklistSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        require: [true, "User id must be provided"],
    },
    ip: {
        type: String,
        require: [true, "ip must be provided"],
        unique: true
    },
    loginAttempts: {
        type: Number,
        require: [true, "ip must be provided"],
        default: 0
    },
    blockingTimestamps: {
        type: Date,
    },
    expireAt: Date
}, { timestamps: true });
BlacklistSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
var Blacklist = mongoose_1.models.Blacklist || mongoose_1.model('Blacklist', BlacklistSchema);
exports.Blacklist = Blacklist;
