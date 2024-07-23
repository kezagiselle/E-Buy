import mongoose from 'mongoose';
import {model, Schema} from 'mongoose';

const cartSchema = new mongoose.Schema({
    buyer_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const cartModel = mongoose.model('cart', cartSchema);
export default cartModel;