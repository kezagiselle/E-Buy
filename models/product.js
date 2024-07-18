import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image:{ 
        filename: String, 
        path: String, 
        mimetype: String, 
        size: Number 
      },
      uploaded_at:{
        type: Date,
        required: true
    }
});

const productModel = new mongoose.model('products', productSchema);
export default productModel;