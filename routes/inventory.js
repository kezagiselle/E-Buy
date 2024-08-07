import inventoryController from "../controllers/inventory.js";
import express from "express";
const inventoryRouter = express.Router();

inventoryRouter.post('/add',inventoryController.createInventory);
inventoryRouter.get('/getAll', inventoryController.getAllInventory);
inventoryRouter.get('/getById', inventoryController.getInventoryById);
inventoryRouter.put('/update/:id', inventoryController.updateInventory);
inventoryRouter.delete('/delete/:id', inventoryController.deleteInventory);

export default inventoryRouter;
