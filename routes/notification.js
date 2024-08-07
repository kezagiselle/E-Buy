import notificationControllers from "../controllers/notification.js";
import express from 'express'
const notificationRouter = express.Router();

notificationRouter.post('/create', notificationControllers.createNotification);
notificationRouter.get('/getAll', notificationControllers.getAllNotifications);
notificationRouter.get('/getById', notificationControllers.getNotificationById);
notificationRouter.put('/update/:id', notificationControllers.updateNotification);
notificationRouter.delete('/delete/:id', notificationControllers.deleteNotification);

export default notificationRouter;