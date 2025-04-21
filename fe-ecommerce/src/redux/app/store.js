import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";
import userReducer from "../features/auth/userSlice";
import productReducer from "../features/home/productSlice";
import cartReducer from "../features/home/cartSlice";
import orderReducer from "../features/home/orderSlice"

const store=configureStore({
  reducer:{
    register:registerReducer,
    login:loginReducer,
    user:userReducer,
    product:productReducer,
    cart:cartReducer,
    address:orderReducer
  }
});
export default store;