import express from 'express';
const productRouter = express.Router();
import productControllers from '../controllers/product.js';
import { upload } from '../middleware/multer.js';

productRouter.post('/upload', upload.single('image'), productControllers.addImage);
productRouter.get('/getAll', productControllers.getAllProducts);
productRouter.get('/getById/:id', productControllers.getProductById);
productRouter.put('/update/:id', productControllers.updateProduct);
productRouter.delete('/delete/:id', productControllers.deleteProduct);

export default productRouter;