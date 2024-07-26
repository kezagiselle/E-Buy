import reviewModel from "../models/review.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";
import { response } from "express";

const createReview = asyncWrapper(async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const newReview = await reviewModel.create(req.body);
    return res.status(201).json(newReview);
});

const getReviewByProduct = asyncWrapper(async (req,res,next) =>{
    const productId = req.params.id;
    const foundReview = await reviewModel.findById(productId);
    if(!foundReview){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    res.status(201).json(foundReview);
});

const getAllReviews = asyncWrapper(async (req, res, next) =>{
    const allReviews = await reviewModel.find({});
    if(allReviews){
        return res.status(201).json({
            nbHits: allReviews,
            allReviews
        })
    }
});

const updateReview = asyncWrapper(async (req, res, next) =>{
    const reviewId = req.params.id;
    const updates = req.body;
    const updatedReview = await reviewModel.findByIdAndUpdate(reviewId, updates, {new: true});
    if(!updateReview){
        return next(new NotFoundError('Review not found'));
    }
    res.status(201).json(updatedReview);
});

const deleteReview = asyncWrapper(async (req, res, next) =>{
    const reviewId = req.params.id;
    const deletedReview = await reviewModel.findByIdAndDelete(reviewId, {delete: true});
    if(!deletedReview){
        return next(new NotFoundError('Review not found'));
    }
    res.status(201).json({message: 'Item deleted successfuly'})
});

const reviewControllers = {
    createReview,
    getReviewByProduct,
    getAllReviews,
    updateReview,
    deleteReview,
}
export default reviewControllers;