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
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params; // Get product ID from URL parameters
      const product = await Product.findById(id); // Find the product by ID

      if (!product) {
        return res.status(404).json({ message: 'Product not found' }); // If product doesn't exist, return 404
      }

      res.status(200).json(product); // Return the product details
    } catch (err) {
      res.status(500).json({ message: err.message }); // Handle any errors that occur
    }
  }
};
module.exports=productController;

