import { Schema,models,model } from "mongoose"



const BlacklistSchema: Schema = new Schema({
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
}, {timestamps: true})

BlacklistSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Blacklist = models.Blacklist || model('Blacklist', BlacklistSchema);

export {Blacklist}