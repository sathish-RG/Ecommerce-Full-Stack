const express = require('express');
const userController = require('../controllers/userController');
const productController=require('../controllers/productController');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.get('/profile',auth.checkAuth,auth.allowRoles(['user','admin']), userController.getProfile);
userRouter.put('/profile',auth.checkAuth,auth.allowRoles(['user','admin']), userController.updateProfile);
userRouter.delete('/profile',auth.checkAuth,auth.allowRoles(['user','admin']), userController.deleteProfile);

userRouter.post('/cart/:productId',auth.checkAuth,auth.allowRoles(['user']),userController.addToCart);
userRouter.get('/cart',auth.checkAuth,auth.allowRoles(['user']),userController.myCart);
userRouter.delete('/cart/:productId', auth.checkAuth, auth.allowRoles(['user']), userController.removeFromCart);
userRouter.delete('/cart', auth.checkAuth, auth.allowRoles(['user']), userController.clearCart);
userRouter.put('/cart/update/:productId',auth.checkAuth,auth.allowRoles(['user']),userController.updateQuantity);

userRouter.get('/products',productController.getAllProducts);
userRouter.get('/product/:id', productController.getProductById);


module.exports = userRouter;