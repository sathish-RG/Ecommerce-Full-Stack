import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'address',
  initialState: {
    form: {
      address: '',
    }
  },
  reducers: {
    setAddress: (state, action) => {
      state.form.address = action.payload;
    }
  }
});

export const { setAddress } = orderSlice.actions;
export const selectAddress = (state) => state.address.form.address;

export default orderSlice.reducer;
