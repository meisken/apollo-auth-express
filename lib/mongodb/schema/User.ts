import { Schema,models,model } from "mongoose"
const { isEmail } = require('validator');

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        require: [true, 'Please enter an username'],
        maxlength: [255, 'Maximum last name length is 255 characters'],
    },
    email: {
        type: String,
        require: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail,'please enter a valid email']
    },
    password: {
        type: String,
        required: [true,'Please enter an password'],
        minlength: [6,'Minimum password length is 6 characters'],
    },
    admin: Boolean, 
    confirmed: {
        type: Boolean,
        require: [true, "User Object must have a confirmed field"]
    },
    pictureUrl: String

})


const User = models.User || model('User', UserSchema);

export {User}