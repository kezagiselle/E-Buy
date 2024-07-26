import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const shippingSchema = new mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    trackingNumber: {
        type: Number,
        required: true
    },
    shipping_method:{
        type: String,
        required: true
    },
    shipping_date:{
       type: Date,
       required: true
    },
    delivery_date:{
        type: Date,
        required: true
    }
});
const shippingModel = mongoose.model('shipping', shippingSchema);
export default shippingModel;