const express =require("express");
const app=express();
const cookieParser=require('cookie-parser');
const morgan=require('morgan');
const cors=require('cors');
const authRouter= require('./routes/authRoutes');
const userRouter= require('./routes/userRouter');
const adminRouter = require("./routes/adminRoutes");
const orderRouter=require('./routes/orderRouter')

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/order',orderRouter);

module.exports=app;