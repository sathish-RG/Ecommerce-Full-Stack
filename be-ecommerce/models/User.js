const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
email:{
  type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true
},
password:{
  type:String,
  required:true,
  minlength:8,
},
role:{
  type:String,
  enum:['admin','user'],
  default:'user'
},
name:{
  type:String,
  required:true,
  trim:true
},
cart:[
{
  productId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Product'
},
quantity:{
  type: Number,
  default: 1
}}],
createdAt:{
  type:Date,
  default:Date.now
},
updatedAt:{
  type:Date,
  default:Date.now
}
});
module.exports=mongoose.model('User',userSchema, 'users')