import userController from "../controllers/user.js";
import express from "express";
const userRouter = express.Router();
// import allValidations from "../utilis/validation.js";

userRouter.post('/signup',userController.signUp);
userRouter.post('/login',userController.signIn)
userRouter.post('/verify',userController.validateOtp);
userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.post('/reset', userController.resetPassword);
userRouter.delete('/delete/:id', userController.deleteUser);

export default userRouter;
