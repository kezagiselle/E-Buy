import inventoryModel from "../models/inventory.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const createInventory = asyncWrapper(async (req, res, next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new BadRequestError(errors.array()[0].msg));
  }
  const newInventory = await inventoryModel.create(req.body);
  return res.status(201).json(newInventory);
});

const getAllInventory = asyncWrapper(async (req,res,next) =>{
    const inventories = await inventoryModel.find({});
    if(inventories){
        return res.status(201).json({
            nbHits: inventories.length,
            inventories
        })
    }
    res.status(404).json({message: 'No inventories available!'})
});

const getInventoryById = asyncWrapper(async (req, res, next) =>{
    const inventoryId = req.params.id;
    const inventory = await inventoryModel.findById(inventoryId);
    if(!inventory){
        return next(new NotFoundError('No inventory with such id!'));
    }
    res.status(201).json(inventory);
});

const updateInventory = asyncWrapper(async (req, res, next) =>{
    const inventoryId = req.params.id;
    const updates = req.body;
    const updatedInventory = await inventoryModel.findByIdAndUpdate(inventoryId, updates, {new: true});
    if(!updatedInventory){
        return next(new NotFoundError('No inventory with such id!'));
    }
    res.status(201).json(updatedInventory);
});

const deleteInventory = asyncWrapper(async (req, res, next) =>{
    const inventoryId = req.params.id;
    const deletedInventory = await inventoryModel.findByIdAndDelete(inventoryId);
    if(!deletedInventory){
        return next(new NotFoundError('No inventory with such id!'));
    }
    res.status(201).json({message: 'Inventory deleted successfully!'});
}); 

const inventoryController = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
}
export default inventoryController;