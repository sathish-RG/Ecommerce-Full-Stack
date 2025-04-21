import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
  name:'cart',
  initialState:[],
  reducers:{
    setCart:(state,action)=>{ return action.payload},
    
  }
});
export const {setCart}=cartSlice.actions;
export const selectCart=state=>state.cart;
export default cartSlice.reducer;