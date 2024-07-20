import orderModel from "../models/order.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addOrder = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg))
    }
    const newOrder = await orderModel.create(req.body);
    return res.status(201).json(newOrder);    
});

const getAllOrders = asyncWrapper(async (req, res,next) =>{
    const orders = await orderModel.find({});
    if(orders){
        return res.status(201).json({
            nbHits: orders.length,
            orders
        })
    }
});

const getOrderById = asyncWrapper(async (req, res, next) =>{
    const orderId = req.params.id;
    const foundOrder = await orderModel.findById(orderId);
    if(!foundOrder){
        return next(new NotFoundError('Order not found'));
    }
    res.status(201).json(foundOrder);
});

const getOrderByStatus = asyncWrapper(async (req, res, next) =>{
    const status = req.params.status;
    const foundOrders = await orderModel.find({status});
    if(!foundOrders){
        return next(new NotFoundError('order not found'));
    }
    res.status(201).json( foundOrders );
});

const updateOrder = asyncWrapper(async (req, res, next) =>{
    const orderId = req.params.id;
    const updates = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, updates, {new: true});
    if(!updatedOrder){
        return next(new NotFoundError('order not found'));
    }
    res.status(201).json(updatedOrder);
});

const deleteOrder = asyncWrapper(async (req, res, next)=>{
    const orderId = req.params.id;
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);
    if(!deletedOrder){
        return next(new NotFoundError('Order not found'));
    }
    return res.status(201).json({message: 'order deleted successfully'});
});

const orderControllers = {
    addOrder,
    getAllOrders,
    getOrderById,
    getOrderByStatus,
    updateOrder,
    deleteOrder,
 };
 export default orderControllers;