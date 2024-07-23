import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import userModel from "../models/user.js";
import asyncWrapper from "../middleware/async.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequestError.js";

const addProductToCart = async (req, res, next) =>{
    try{
        const { buyer_id, product_id, quantity} = req. body;

        //validate user
        const user = await userModel.findById(buyer_id);
        if(!user){
            return next(new NotFoundError('User not found'));
        }
        //validate product
        const product = await productModel.findById(product_id);
        if(!product){
            return next(new NotFoundError('Product not found'));
        }
        //check if product is already in cart
        let cartItem = await cartModel.findOne({buyer_id, product_id});
        if(cartItem){
            //update quantity and total price if product is already in cart
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.quantity * product.price;
        } else {
            //add a new product to cart
            const totalPrice = quantity * product.price;
            cartItem = new cartModel({
                buyer_id,
                product_id,
                quantity,
                totalPrice
            });
    }
     await cartItem.save();
        res.status(201).json({message: 'Product added to cart', cartItem});
    } catch (error){
        res.status(401).json({message: 'Not able to add to cart'});
    }
};

// Get cart items by cart ID 
const getCartItemsById = async (req, res, next) => {
    const buyerId = req.params.buyerId;
    try {
      const userId = req.user_id
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const cart= await cartModel.findById(userId, req.params.userId)
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }


const getAllCartList = asyncWrapper(async (req, res, next) =>{
    const cartList = await cartModel.find({});
    if(cartList){
        return res.status(201).json({
            nbHits: cartList.length,
            cartList
        })
    }
});

const removeProduct = asyncWrapper(async (req, res, next) =>{
    const product_id = req.params.id;
    const deletedProduct = await cartModel.findByIdAndDelete(product_id);
    if(!deletedProduct){
        return next(new NotFoundError('Product not found'));
    }
    return res.status(201).json({message: 'Product deleted successfully'})
});

const cartControllers = {
    addProductToCart,
    getCartItemsById,
    getAllCartList,
    removeProduct,
 };
export default cartControllers;
    
   
