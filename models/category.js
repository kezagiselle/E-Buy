import mongoose from "mongoose";
import { model, Schema} from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       unique: true  
    },
    description: {
        type: String,
        required: true, 
     }
});
const categoryModel = mongoose.model('category', categorySchema);
export default categoryModel;