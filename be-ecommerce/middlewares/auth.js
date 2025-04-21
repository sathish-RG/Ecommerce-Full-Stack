const {JWT_SECRET}=require('../utils/config');
const jwt =require('jsonwebtoken');
const User=require('../models/User');

const auth={
checkAuth:(req,res,next)=>{
  //get the token from the cookie
  const token=req.cookies.token;
  //if the token is not present
  if(!token){
    return res.status(401).json({message:'Unautheraized'})
  };
  //verify the token
  jwt.verify(token,JWT_SECRET,(err,user)=>{
    //if token is invalid
    if(err){
      return res.status(401).json({message:'Unautheraized'})
    };
    //set the user in request object
    req.userId=user.id;
    //call the next middleware
    next();
  })
},
allowRoles:(roles)=>{
 return async (req,res,next)=>{
  //get the user id from the request
  const userId=req.userId;
  //find the user by id
  const user=await User.findById(userId);
  //if the user not found
  if(!user){
    return res.status(401).json({message:'Unautheraized'})
  };
  //check if the user role is in the allowed roles
  if(!roles.includes(user.role)){
    return res.status(403).json({message:'Forbidden'})
  };
  //call the next middleware
  next();
  }
}
};
module.exports =auth;