import notificationModel from "../models/notification.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import ErrorHandler from "../middleware/ErrorHandler.js";
import asyncWrapper from "../middleware/async.js";
import { validationResult } from "express-validator";

const createNotification = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const newNotification = await notificationModel.create(req.body);
    return res.status(201).json({message: 'Notification sent!'});
});

const getAllNotifications = asyncWrapper(async (req, res, next) =>{
    const notifications = await notificationModel.find({})
    if(notifications){
        return res.status(201).json({
            nbHits: notifications.length,
            notifications
        })
    }
res.status(404).json({message: 'No Notifications available!'})
});

const getNotificationById = asyncWrapper(async (req, res, next) =>{
    const notificationId = req.params.id;
    const notification = await notificationModel.findById(notificationId)
    if(!notification){
        return next(new NotFoundError('Notification not found'));
    }
    res.status(201).json(notificationId);
});

const updateNotification = asyncWrapper(async (req, res, next) =>{
    const notificationId = req.params.id;
    const updates = req.body;
    const updatedNotification = await notificationModel.findByIdAndUpdate(notificationId, updates, {new: true});
    if(!updatedNotification){
        return next(new NotFoundError('Notification not found'));
    }
    res.status(201).json(updatedNotification);
});

const deleteNotification = asyncWrapper(async (req, res, next) =>{
    const notificationId = req.params.id;
    const deletedNotification = await notificationModel.findByIdAndDelete(notificationId);
    if(!deletedNotification){
        return next(new NotFoundError('Notification not found'));
    }
    res.status(201).json({message: 'Notification deleted successfully'})
});

const notificationControllers = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
};
export default notificationControllers;