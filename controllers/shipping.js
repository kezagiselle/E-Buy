import shippingModel from "../models/shipping.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const createShipping = asyncWrapper(async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const shippingData = req.body;
    const newShipping = await shippingModel.create(shippingData);
   return res.status(201).json(newShipping);   
});

const getShippingById = asyncWrapper(async (req, res, next)=>{
    const shippingId = req.params.id;
    const foundShipping = await shippingModel.findById(foundShipping);
    if(!foundShipping){
        return next(new NotFoundError('Shipping not found'));
    }
    res.status(201).json(foundShipping);
});

const getAllShipping = asyncWrapper(async (req, res, next) =>{
    const shipping = await shippingModel.find({});
    if(!shipping){
        return next(new NotFoundError('shipping not found'));
    }
    res.status(201).json(shipping);
});

const updateShipping = asyncWrapper(async (req, res, next)=>{
    const shippingId = req.params.id;
    const updates = req.body;
    const updatedShipping = await shippingModel.findByIdAndUpdate(shippingId, updates, {new: true});
    if(!updatedShipping){
        return next(new NotFoundError('shipping not found'));
    }
    res.status(201).json(updateShipping);
});

const deleteShipping = asyncWrapper(async (req, res, next)=>{
    const shippingId = req.params.id;
    const deletedShipping = await shippingModel.findByIdAndDelete(shippingId);
    if(!deletedShipping){
        return next(new NotFoundError('shipping not found'));
    }
    res.status(201).json({message: 'Shipping deleted successfully'});
});
 const shippingController = {
    createShipping,
    getShippingById,
    getAllShipping,
    updateShipping,
    deleteShipping
 };
 export default shippingController;


