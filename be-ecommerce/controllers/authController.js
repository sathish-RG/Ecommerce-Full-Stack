const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../utils/config');


const authController={
  register:async(req,res)=>{
    try{
     //Get user data from request body
     const {email,password,name}=req.body;
     //Check if user already exists
     const user=await User.findOne({email});
     if(user){
      return res.status(400).json({message:'User already exists'});
     }
     //Hash the password
      const hashPassword=await bcrypt.hash(password,10);
     //Create new user
     const newUser=await User.create({
      email,
      password:hashPassword,
      name
     })
     //save user to database
      await newUser.save();
     //return Success message
     res.status(201).json({message:'User created successfully'});
    }catch(err){
      res.status(500).json({message:err.message});
    }
  },
  login:async(req,res)=>{
    try{
     //get the detailes from the request body
     const {email, password}=req.body;
     //check if the user exist
     const user=await User.findOne({email});
     //if the user not exist
     if(!user){
      return res.status(400).json({message:'User dose not exist'})
     };
     //check if the password is correct
     const isPasswordCorrect=await bcrypt.compare(password, user.password);
     //if the password is incorrect
     if(!isPasswordCorrect){
      return res.status(400).json({message:'Wrong Password'})
     };
     //create a tocken
     const token=jwt.sign({id:user._id},JWT_SECRET)
     //set the token in the cookies
     res.cookie('token',token,{httpOnly:true});
     //return the success message
     res.status(200).json({
      message: "User login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // optional if you're using JWT
    });
    }catch(err){
      res.status(500).json({message:err.message});
    }
  },
  logout:async(req,res)=>{
    try{
      //clear the token from cookies
      res.clearCookie('token')
      //return success message
      res.status(200).json({message:'Logout successfully'})

    }catch(err){
      res.status(500).json({message:err.message});
    }
  },
  me:async(req,res)=>{
    try{
    //get the userID from the request object
    const {userId}=req;
    //get the details from the database
    const user=await User.findById(userId).select('-password -__v');
    //return the user details
    res.status(200).json({user})
    }catch(err){
      res.status(500).json({message:err.message});
    }
  }
};
module.exports=authController;