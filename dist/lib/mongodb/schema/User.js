"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var isEmail = require('validator').isEmail;
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: [true, 'Please enter an username'],
        maxlength: [255, 'Maximum last name length is 255 characters'],
    },
    email: {
        type: String,
        require: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    admin: Boolean,
    confirmed: {
        type: Boolean,
        require: [true, "User Object must have a confirmed field"]
    },
    pictureUrl: String
});
var User = mongoose_1.models.User || mongoose_1.model('User', UserSchema);
exports.User = User;
