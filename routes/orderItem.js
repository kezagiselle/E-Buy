import orderItemController from "../controllers/orderItem.js";
import express from 'express';
const orderItemRouter = express.Router();

orderItemRouter.post('/addItem', orderItemController.addOrderItem);
orderItemRouter.get('/getAll', orderItemController.getAllItems);
orderItemRouter.get('/getById', orderItemController.getItemsById);
orderItemRouter.get('/getByOrder', orderItemController.findByOrder);
orderItemRouter.put('/update/:id', orderItemController.updateItem);
orderItemRouter.delete('/delete/:id', orderItemController.deleteItem);

export default orderItemRouter;


