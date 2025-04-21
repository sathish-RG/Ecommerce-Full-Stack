const Product = require('../models/Product');
const User =require('../models/User');

const userController={
  getProfile:async(req,res)=>{
    try{
      //get the user id from the request
      const userId=req.userId;
      //find the user by id
      const userProfile=await User.findById(userId)
      //send the user profile
      res.status(200).json({userProfile})

    }catch(err){
      res.status(500).json({message:err.message});
    }
  },
  updateProfile:async(req,res)=>{
    try{
      //get the user id from the request
      const userId=req.userId;
      //ger the data frome the request body
      const {name,emeil,password}=req.body;
      //update the user profile in the database
      const updateProfile=await User.findByIdAndUpdate(userId,{name,emeil,password},{new:true});
      //send updated response
      res.status(200).json({message:'profile updated successfully',updateProfile})

  }catch(err){
      res.status(500).json({message:err.message});
    }
  },
  deleteProfile:async(req,res)=>{
    try{
     //get the user id from the request
     const userId=req.userId;
     //delete the user profile from the database
    await User.findByIdAndDelete(userId);
    // logout the user by clearing the cookies
    res.clearCookie('token');
    //send success message
    res.status(200).json({message:'profile deleted successfully'})
    }catch(err){
      res.status(500).json({message:err.message});
    }
  },
  addToCart: async (req, res) => {
    try {
      const productId = req.params.productId;
      const userId = req.userId;
  
      const user = await User.findById(userId);
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if product already exists in cart
      const existingItem = user.cart.find(item => item.productId.toString() === productId);
  
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if exists
      } else {
        user.cart.push({ productId: productId, quantity: 1 }); // Add new item
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Product added to the cart' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  myCart: async (req, res) => {
    try {
      const userId = req.userId;
  
      const user = await User.findById(userId).populate('cart.productId');
  
      res.status(200).json({ cart: user.cart });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  removeFromCart: async (req, res) => {
    try {
      // Get productId from the route parameter
      const productId = req.params.productId;
  
      // Get userId from authenticated request (assumed set by auth middleware)
      const userId = req.userId;
  
      // Find the user
      const user = await User.findById(userId);
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Filter out the product from the cart
      user.cart = user.cart.filter(item => item.productId.toString() !== productId);
  
      // Save the updated user document
      await user.save();
  
      // Respond to the client
      res.status(200).json({ message: 'Product removed from cart successfully', cart: user.cart });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  clearCart: async (req, res) => {
    try {
      // Get userId from authenticated request (set by auth middleware)
      const userId = req.userId;
  
      // Find the user
      const user = await User.findById(userId);
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Clear the cart by setting it to an empty array
      user.cart = [];
  
      // Save the updated user document
      await user.save();
  
      // Respond to the client
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateQuantity: async (req, res) => {
    try {
      // 1. Get the user ID from auth middleware
      const userId = req.userId;
  
      // 2. Get the productId from URL parameters
      const productId = req.params.productId;
  
      // 3. Get new quantity from request body
      const { quantity } = req.body;
  
      // 4. Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // 5. Check if product exists in user's cart
      const cartItem = user.cart.find(item => item.productId.toString() === productId);
      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // 6. Update the quantity
      cartItem.quantity = quantity;
  
      // 7. Save the updated user
      await user.save();
  
      // 8. Send success response
      res.status(200).json({ message: 'Quantity updated successfully', cart: user.cart });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  }
    
  

module.exports=userController;