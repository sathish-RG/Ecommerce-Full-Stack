import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
  name:'product',
  initialState:[],
  reducers:{
    setProduct:(state,action)=>action.payload,
    
  }
});
export const {setProduct}=productSlice.actions;
export const selectProduct=state=>state.product;
export default productSlice.reducer;