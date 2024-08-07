import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const discountSchema = new mongoose.Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount_percentage: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    }
});
const discountModel = mongoose.model('discount', discountSchema);
export default discountModel;