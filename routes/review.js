import express from 'express';
const reviewRouter = express.Router();
import reviewControllers from '../controllers/review.js';

reviewRouter.post('/create', reviewControllers.createReview);
reviewRouter.get('/getByProduct', reviewControllers.getReviewByProduct);
reviewRouter.get('/getAll', reviewControllers.getAllReviews);
reviewRouter.put('/update/:id', reviewControllers.updateReview);
reviewRouter.delete('/delete/:id', reviewControllers.deleteReview);

export default reviewRouter;
