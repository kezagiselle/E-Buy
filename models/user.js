import mongoose from "mongoose";
import {model, Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpires: {
        type: Date,
        required: true
    },
    verified: {
        type: String,
        required: true,
        default: false
    }
}, {
    timestamps: true
},
);
const userModel = mongoose.model('user', userSchema);
export default userModel;