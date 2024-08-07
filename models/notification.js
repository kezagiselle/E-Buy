import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    is_read: {
        type: Boolean,
        required: true,
        default: false
    } 
});
const notificationModel = mongoose.model('notification', notificationSchema);
export default notificationModel;