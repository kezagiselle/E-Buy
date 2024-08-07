import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const wishListSchema = new mongoose.Schema({
   user_id: {
     type: Schema.Types.ObjectId,
     ref: 'user',
     required: true
   },
   product_id: {
     type: Schema.Types.ObjectId,
     ref: 'product',
     required: true
   },
   created_at: {
     type: Date,
     default: Date.now
   }
});
const wishListModel = mongoose.model('wishList', wishListSchema);
export default wishListModel;