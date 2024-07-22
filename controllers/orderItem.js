import orderItemModel from "../models/orderItem.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import ErrorHandler from "../middleware/ErrorHandler.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addOrderItem = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new ErrorHandler(errors.array()[0].msg));
    }
    const newOrderItem = await orderItemModel.create(req.body);
    return res.status(201).json(newOrderItem);
});

const getAllItems = asyncWrapper(async (req, res, next) => {
    const orderItems =  await orderItemModel.find({});
    if(orderItems){
        return res.status(201).json({
            nbHits: orderItems.length,
            orderItems
        })
    }
});

const getItemsById = asyncWrapper(async (req, res, next) =>{
    const itemId = req.params.id;
    const foundItem = await orderItemModel.findById(itemId);
    if(!foundItem){
        return next(new NotFoundError('Item not found'));
    }
    res.status(200).json(foundItem);
});

const findByOrder = asyncWrapper(async (req, res,next) =>{
    const orderId = req.query.orderId;
    const foundItems = await orderItemModel.findById({orderId});
    if(!foundItems){
        return next(new NotFoundError('orderItems not Found'));
    }
    return res.status(200).json(foundItems);
});

const updateItem = asyncWrapper(async (req, res, next) =>{
    const itemId = req.params.id;
    const updates = req.body;
    const updatedItem = await orderItemModel.findByIdAndUpdate(itemId, updates, {new: true});
    if(!updatedItem){
        return next(new NotFoundError('Item not found'));
    }
    res.status(200).json(updatedItem);
});

const deleteItem = asyncWrapper(async (req, res, next) => {
    const itemId = req.params.id;
    const deletedItem = await orderItemModel.findByIdAndDelete(itemId);
    if(!deletedItem){
        return next(new NotFoundError('Item not found'));
    }
    res.status(201).json({message: 'Item deleted Successfully'})
});

const orderItemController = {
    addOrderItem,
    getAllItems,
    getItemsById,
    updateItem,
    deleteItem,
    findByOrder
}
export default orderItemController;