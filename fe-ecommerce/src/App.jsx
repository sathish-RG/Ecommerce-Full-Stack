import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setUser } from './redux/features/auth/userSlice'
import UserDetailes from './pages/UserDetailes'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import ProductDetails from './pages/ProductDetails'


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      dispatch(setUser(JSON.parse(userData))); // 👈 Restore user in Redux
    }
  }, [dispatch]);
  const router =createBrowserRouter([
    {
      path:'/',
      element:<Navbar/>,
      children:[
  {
    path:'',
    element:<Products/>
  } ,     
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/Home',
    element:<Home/>
  },
  {
    path:'/user',
    element:<UserDetailes/>
  },
  {
    path:'/cart',
    element:<Cart/>
  },
  {
    path:'/checkout',
    element:<Checkout/>
  },
  {
    path:'/product/:id',
    element:<ProductDetails/>
  }  
  ]}
  ])
  return (
    <>
    
    <RouterProvider router={router}/>
    <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
   
    </>
  )
}

export default App