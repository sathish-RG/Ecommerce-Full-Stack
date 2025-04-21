import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectEmail, selectPassword, setEmail, setPassword } from '../redux/features/auth/registerSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authServices from '../services/authServices';
import { setUser } from '../redux/features/auth/userSlice';

const Login = () => {

 const email=useSelector(selectEmail);
 const password=useSelector(selectPassword)

 const dispatch=useDispatch();
 const navigate=useNavigate();

 const handleLogin=async (e)=>{
  e.preventDefault();
  //call the login function from authService
  try{
   const response=await authServices.login({email,password});
   
   if (response.status==200){
    //save local storage in user details
    localStorage.setItem('user', JSON.stringify(response.data.user));
    toast.success('Login successfully')
    //dispatch the user data to the redux
    dispatch(setUser(response.data.user))
   };
   //clear the form
   dispatch(setEmail(''));
   dispatch(setPassword(''));
   //redirect to the home page
   setTimeout(()=>{
    navigate('/home')
   },500);
  }catch(err){
    toast.error('Login Error',err.message);
  }
 }



  return (
    <div className='flex flex-col items-center justify-center w-full h-full mt-[50px]'>
    <div className=' flex flex-col items-center justify-center border bg-gray-200 border-gray-600 h-[300px] w-[400px] gap-4 rounded-xl'>
      <h1 className=' text-3xl font-bold text-black'>Login</h1>
      <form className='flex flex-col gap-4 items-center justify-center' onSubmit={handleLogin}>
        <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e)=>dispatch(setEmail(e.target.value))}
        className=' w-[300px] h-10 p-1 bg-gray-300 rounded'
        autoComplete='email'
        />
        <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e)=>dispatch(setPassword(e.target.value))}
        className=' w-[300px] h-10 p-1 bg-gray-300 rounded'/>
        <button type="submit" className=' p-1 bg-blue-500 hover:bg-blue-700 rounded-xl text-2xl font-bold text-black'>Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login