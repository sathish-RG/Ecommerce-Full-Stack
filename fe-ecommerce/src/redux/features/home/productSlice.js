import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  singleProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

export const { setProduct, setSingleProduct } = productSlice.actions;

export const selectProduct = (state) => state.product.products;
export const selectSingleProduct = (state) => state.product.singleProduct;

export default productSlice.reducer;
