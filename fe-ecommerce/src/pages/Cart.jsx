import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, setCart } from '../redux/features/home/cartSlice';
import { toast } from 'react-toastify';
import userServices from '../services/userServices';
import { selectUser } from '../redux/features/auth/userSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart); // ✅ Get cart from Redux
  const user = useSelector(selectUser);
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if(user){
       const response = await userServices.GetAllCart(); // ✅ API call to get cart
        dispatch(setCart(response.data.cart));// ✅ Save to Redux cart state
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchCart(); // call the async function on mount
  }, [dispatch,user]);

  if (!Array.isArray(cart)) {
    return <div>Loading cart items...</div>; // ✅ safety check
  }

  const handleDeleteCart=async(e,productId)=>{
    e.preventDefault();
   try{
    await userServices.deleteCart(productId);
    toast.success("Delete Successfully")

      // 🔁 Re-fetch updated cart
      const response = await userServices.GetAllCart();
      dispatch(setCart(response.data.cart));

   }catch(err){
    toast.error(err.message)
   }
  }

  const handleUpdateQuantity = async (productId, newQty) => {
    try {
      {user &&  await userServices.addQuantity(productId,{ quantity: newQty }); // 🔁 Update API
      toast.success("Quantity updated");
  
      const response = await userServices.GetAllCart();
      dispatch(setCart(response.data.cart));} // ✅ Update Redux
    } catch (err) {
      toast.error(err.message);
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

  
  // Render cart items
  const cartList = cart.map((item) => (
    <div key={item._id} className='flex flex-col w-[250px] border h-auto object-top rounded-2xl'>
      <img src={item.productId?.image} alt={item.productId?.name} className='rounded-t-2xl h-[200px]' />
      <div className=' p-2'>
      <h1 className='text-lg font-bold'>{item.productId?.name}</h1>
      <div className="flex gap-2 items-center">
  <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>-</button>
  <span>{item.quantity}</span>
  <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>+</button>
</div>


      <p className='text-md font-medium'>Price: ${item.productId?.price}</p>
      <button className=' bg-red-300 hover:bg-red-500 p-2 rounded-xl w-[230px]' onClick={(e)=>handleDeleteCart(e,item.productId?._id)}>Delete</button>
      </div>
    </div>
  ));

  return(
   
      <div className='flex flex-col items-center'>
        {/* Cart Items */}
        <div className='flex flex-wrap gap-4 mt-5'>
          {cartList}
        </div>
    
        {/* Total and Checkout */}
        <div className='mt-8 w-full max-w-[400px] p-4 bg-gray-100 rounded-2xl shadow-md text-center'>
          <h2 className='text-xl font-bold mb-2'>Total Amount: ${totalAmount.toFixed(2)}</h2>
          <button className='bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600'>
           <Link to='/checkout'> Checkout </Link>
          </button>
        </div>
      </div>
    
    
  ) ;
};

export default Cart;
