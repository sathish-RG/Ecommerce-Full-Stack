import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../redux/features/home/cartSlice';
import { toast } from 'react-toastify';
import userServices from '../services/userServices';
import { selectAddress, setAddress } from '../redux/features/home/orderSlice';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector(selectCart);
  const address = useSelector(selectAddress);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      toast.error('Please enter a valid address!');
      return;
    }

    const orderData = {
      address,
      cart: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
    };

    try {
      await userServices.placeOrder(orderData);
      dispatch(setAddress(''))
      toast.success('Order placed successfully!');
      // Optionally: clear cart, redirect, or reset form here
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place the order.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-md mb-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Address Input */}
      <div className="w-full mb-4">
        <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          placeholder="Enter your address"
          rows="4"
          value={address}
          onChange={(e) => dispatch(setAddress(e.target.value))}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none w-full"
        />
      </div>

      {/* Cart Items List */}
      <div className="w-full mb-4">
        <h2 className="text-xl font-semibold">Cart Items</h2>
        <div className="space-y-4 mt-2">
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.productId._id} className="flex justify-between items-center">
                <p>{item.productId.name} x {item.quantity}</p>
                <p>${(item.productId.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Total Amount */}
      <div className="w-full mb-4 text-lg font-bold">
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>

      {/* Cash on Delivery */}
      <p className='text-lg w-full'>Cash on Delivery</p>

      {/* Place Order Button */}
      <div className="w-full">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
         <Link to='/home'>Place Order</Link>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
