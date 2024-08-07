import wishListModel from "../models/wishList.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addToWishList = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const wishListData = req.body;
    const wishList = await wishListModel.create(wishListData);
    return res.status(201).json(wishList);
});

const getWishListById = asyncWrapper(async (req,res,next) =>{
    const wishListId = req.params.id;
    const foundWishList = await wishListModel.findById(wishListId);
    if(!foundWishList){
        return next(new NotFoundError('wishList not found'));
    }
    res.status(200).json({message: 'Wish list added successfully'});
});

const getWishListsByUserId = asyncWrapper(async (req, res, next) =>{
    const userId = req.params.userId;
    const wishList = await wishListModel.find({userId: userId})
    if(!wishList){
        return next(new NotFoundError('WishList not found'));
    }
    res.status(201).json(wishList);
});

const updateWishList = asyncWrapper(async(req, res, next) =>{
    const wishListId = req.params.id;
    const updates = req.body;
    const wishList = await wishListModel.findByIdAndUpdate(wishListId, updates, {new: true});
    if(!wishList){
        return next(new NotFoundError('WishList not found'));
    }
    res.status(200).json(wishList);
});

const deleteWishList = asyncWrapper(async (req, res, next) =>{
    const wishListId = req.params.id;
    const deletedWishList = await wishListModel.findByIdAndDelete(wishListId);
    if(!deletedWishList){
        return next(new NotFoundError('WishList not found'));
    }
    res.status(201).json({message: 'WishLzist deleted successfully'});
});

const wishListController = {
    addToWishList,
    getWishListById,
    getWishListsByUserId,
    updateWishList,
    deleteWishList
}
export default wishListController;