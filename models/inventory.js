import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const inventorySchema = new mongoose.Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    restock_level: {
        type: Number,
        required: true
    },
    warehouse_location: {
        type: String,
        required: true
    }
},{
    timestamps: true
});
const inventoryModel = mongoose.model('inventory', inventorySchema);
export default inventoryModel;