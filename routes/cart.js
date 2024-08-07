import cartControllers from "../controllers/cart.js";
import express from "express";
const cartRouter = express.Router();

cartRouter.post('//addProduct', cartControllers.addProductToCart);
cartRouter.get('/getCartItem/:id', cartControllers.getCartItemsById);
cartRouter.get('/getAllList', cartControllers.getAllCartList);
cartRouter.delete('/deleteProduct/:id', cartControllers.removeProduct);

export default cartRouter;