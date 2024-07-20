import categoryModel from "../models/category.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addCategory = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg))
    }
    const newCategory = await categoryModel.create(req.body);
    return res.status(201).json(newCategory);
});

const getCategories = asyncWrapper(async (req, res, next) =>{
    const categories = await categoryModel.find({});
    if(categories){
        return res.status(201).json({
            nbHits: categories.length,
            categories
        });
    }
});

const findByCategory = asyncWrapper(async (req, res, next) =>{
    const categoryId = req.params.category
    const foundCategory = await categoryModel.findById(categoryId);
    if(!foundCategory){
        return next(new NotFoundError('category not found'));
    }
    return res.status(201).json({ foundCategory})
});

const updateCategory = asyncWrapper(async (req, res, next) =>{
    const categoryId = req.params.id;
    const updates = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, updates, { new: true});
    if(!updatedCategory){
        return next(new NotFoundError('category not found'));
    }
    res.status(200).json(updateCategory);
});

const deleteCategory = asyncWrapper(async (req, res, next) =>{
    const categoryId = req.params.id;
    const deletedCategory = await categoryModel.findByIdAndDelete(categoryId)
    if(!deletedCategory){
        return next(new NotFoundError('Category not found'));
    }
    res.status(200).json({message: 'category deleted successfully'})
});

const categoryControllers = {
    addCategory,
    getCategories,
    findByCategory,
    updateCategory,
    deleteCategory
}
export default categoryControllers;
