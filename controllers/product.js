import productModel from "../models/product.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addImage = asyncWrapper(async (req, res, next) =>{
    try {
        const file = req.file;
        if(!file){
            return res.status(400).send('No file uploaded!');
        }

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(new BadRequestError(errors.array()[0].msg));
        }

        const { name, description, price, quantity, category, uploaded_at } = req.body;
        const newImage = new productModel({
            name,
            description,
            price,
            quantity,
            category,
            image: {
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
                size: file.size,
              },
              uploaded_at: uploaded_at || new Date()
        });
         await newImage.save();
         res.status(201).json(newImage);
    } catch (error){
        res.status(500).json({ message: 'Failed to add image'});
    }
});

const getAllProducts = asyncWrapper(async (req,res, next) =>{
    const products = await productModel.find({});
    if(products){
        return res.status(201).json({
            nbHits: products.length,
            products
        });
    }
});

const getProductById = asyncWrapper(async (req, res, next) =>{
    const productId = req.params.id;
    const foundProduct = await productModel.findById(productId);
    if(!foundProduct){
        return next(new NotFoundError('Product not found'));
    }
    return res.status(200).json({ foundProduct})
});

const updateProduct = asyncWrapper(async (req, res, next) =>{
    const productId = req.params.id;
    const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body, {new: true});
    if(!updatedProduct){
        return next(new NotFoundError('Product not found'));
    }
    return res.status(200).json({ updatedProduct })
});

const deleteProduct = asyncWrapper(async (req, res, next) =>{
    const productId = req.params.id;
    const deleteProduct = await productModel.findByIdAndDelete(productId);
    if(!deleteProduct){
        return next(new NotFoundError('Product not found'));
    }
    res.status(200).json({ message: "product deleted successufully"});
});

const productControllers = {
    addImage,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
export default productControllers;