import { createSlice } from "@reduxjs/toolkit";

export const loginSlice= createSlice({
  name:'login',
  initialState:{
    form:{
      email:'',
      password:''
    }
  },
  reducers:{
    setEmail:(state,action)=>{
      state.form.email=action.payload
      state.form.password=action.payload
    }
  }
});

export const {setEmail,setPassword}=loginSlice.actions;
export const selectEmail=state=>state.login.form.email;
export const selectPassword=state=>state.login.form.password;

export default loginSlice.reducer;
