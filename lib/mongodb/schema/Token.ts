import { Schema,models,model } from "mongoose"
import { tokenPrefix } from "../../../function/backend/setToken/tokenPrefix";
import { objectToArray } from "../../../function/both/objectToArray";

const UserTokenSchema: Schema = new Schema({
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
        enum: objectToArray<string>(tokenPrefix)
    },
    expireAt: Date
}, {timestamps: true})

UserTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const UserToken = models.UserToken || model('UserToken', UserTokenSchema);

export {UserToken}