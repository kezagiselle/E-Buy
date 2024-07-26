import shippingController from "../controllers/shipping.js";
import express from "express";
const shippingRouter = express.Router();

shippingRouter.post('/createShipping', shippingController.createShipping);
shippingRouter.get('/getById', shippingController.getShippingById);
shippingRouter.get('/getAll', shippingController.getAllShipping);
shippingRouter.put('/update/:id', shippingController.updateShipping);
shippingRouter.delete('/delete/:id', shippingController.deleteShipping);

export default shippingRouter;