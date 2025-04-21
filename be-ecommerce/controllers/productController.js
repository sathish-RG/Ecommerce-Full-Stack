const Product =require ('../models/Product');
const User =require('../models/Product');

const productController={
  getAllProducts:async(req,res)=>{
    try{
      const products = await Product.find();
      res.status(200).json(products);
    }catch(err){
      res.status(500).json({message:err.message});
    }
  }
};
module.exports=productController;

