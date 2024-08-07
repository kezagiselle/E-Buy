import wishListController from "../controllers/wishList.js";
import express from 'express';
const wishRouter = express.Router();

wishRouter.post('/add', wishListController.addToWishList);
wishRouter.get('/getById/:id', wishListController.getWishListById);
wishRouter.get('/getByUser/:id', wishListController.getWishListsByUserId);
wishRouter.put('/updateList/:id', wishListController.updateWishList);
wishRouter.delete('/deleteList/:id', wishListController.deleteWishList);

export default wishRouter;