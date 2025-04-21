const Products =require ('../models/Product');
const User =require('../models/Product');

const adminController={
  createProduct:async(req,res)=>{
    try{
     const {name,description,price,image,category}=req.body;
     //create new product
     const newProduct=await Products.create({name,description,price,image,category})
     //save the product to the database
     await newProduct.save()
     //return success message
     res.status(201).json({message:'Product created successfully'})
    }catch(err){
      res.status(500).json({message:err.message})
    }
  }
}
module.exports =adminController;