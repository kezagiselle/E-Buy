import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const orderItemModel = mongoose.model('orderItem', orderItemSchema);
export default orderItemModel;