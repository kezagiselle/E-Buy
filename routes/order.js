import orderControllers from "../controllers/order.js";
import express from "express";
const orderRouter = express.Router();

orderRouter.post('/addOrder', orderControllers.addOrder);
orderRouter.get('/getAll', orderControllers.getAllOrders);
orderRouter.get('/getById', orderControllers.getOrderById);
orderRouter.get('/getByStatus', orderControllers.getOrderByStatus);
orderRouter.put('/update/:id', orderControllers.updateOrder);
orderRouter.delete('/delete/:id', orderControllers.deleteOrder);

export default orderRouter;