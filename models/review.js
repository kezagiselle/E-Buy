  import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const reviewSchema = new mongoose.Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true

    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});
const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel;