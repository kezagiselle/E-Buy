import express from 'express';
const Router = express.Router();
import userRouter from "./user.js";
import productRouter from './product.js';
import tokenRouter from './authToken.js';
import catRouter from './category.js';
import orderRouter from './order.js';
import orderItemsRouter from './orderItem.js'
import cartRouter  from './cart.js';

Router.use('/users', userRouter);
Router.use('/products', productRouter);
Router.use('/tokens', tokenRouter);
Router.use('/categories', catRouter);
Router.use('/orders', orderRouter);
Router.use('/ordersItems', orderItemsRouter);
Router.use('/cartList', cartRouter);

export default Router;

