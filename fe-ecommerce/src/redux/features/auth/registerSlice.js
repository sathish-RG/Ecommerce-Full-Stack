import {createSlice} from "@reduxjs/toolkit"

export const registerSlice=createSlice({
  name:'register',
  initialState:{
    form:{
      name:'',
      email:'',
      password:''
    }
  },
  reducers:{
    setName:(state,action)=>{
      state.form.name=action.payload;
    },
    setEmail:(state,action)=>{
      state.form.email=action.payload;
    },
    setPassword:(state,action)=>{
      state.form.password=action.payload;
    }
  }
});

export const {setName,setEmail,setPassword}=registerSlice.actions;
export const selectName=state=>state.register.form.name;
export const selectEmail=state=>state.register.form.email;
export const selectPassword=state=>state.register.form.password;

export default registerSlice.reducer;