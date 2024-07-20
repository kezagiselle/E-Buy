import mongoose, { mongo } from "mongoose";
import { model, Schema} from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    order_Date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'shipped', 'Delivered', 'cancelled', 'Returned']
    },
    total_amount: {
        type: Number,
        required: true
    }
});
const orderModel = mongoose.model('order', orderSchema);
export default orderModel;