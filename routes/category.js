import categoryControllers from "../controllers/category.js";
import express from "express";
const catRouter = express.Router();
// import allValidations from "../utilis/validation.js";

catRouter.post('/addCat',categoryControllers.addCategory);
catRouter.get('/getByCat/:category', categoryControllers.findByCategory);
catRouter.get('/getAll', categoryControllers.getCategories);
catRouter.delete('/delete/:id', categoryControllers.deleteCategory);
catRouter.put('/update/:id', categoryControllers.updateCategory);

export default catRouter;