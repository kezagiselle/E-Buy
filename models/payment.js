import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const paymentSchema = new mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    payment_date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});
const paymentModel = mongoose.model('payment', paymentSchema);
export default paymentModel;