const express=require ('express');
const adminController=require('../controllers/adminController');
const auth=require('../middlewares/auth');

const adminRouter=express.Router();

adminRouter.post('/product',auth.checkAuth,auth.allowRoles(['admin']),adminController.createProduct);

module.exports=adminRouter;