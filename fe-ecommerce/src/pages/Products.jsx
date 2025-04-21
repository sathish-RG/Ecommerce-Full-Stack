import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import productsServices from '../services/productsServices' // ✅ check spelling
import { selectProduct, setProduct } from '../redux/features/home/productSlice'
import userServices from '../services/userServices'
import { setCart } from '../redux/features/home/cartSlice'
import { selectUser } from '../redux/features/auth/userSlice'
import { Link } from 'react-router-dom'

const Products = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user=useSelector(selectUser);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsServices.product(); // ✅ call your API
        dispatch(setProduct(response.data)); // ✅ update Redux store
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchProducts(); // call the async function
  }, [dispatch]);

  if (!Array.isArray(product)) {
    return <div>Loading products...</div>;
  }

  //add to cart function
  const handleAddToCart=async(e,productId)=>{
  e.preventDefault();
  try{
    // Optional data (example: quantity), customize as needed
    const cartData = { quantity: 1 };
    // Call backend service to add product to cart
    await userServices.addToCart(productId,cartData);

    const response = await userServices.GetAllCart();
    dispatch(setCart(response.data.cart));
    
    toast.success("Product added to cart!");
    
  }catch(err){
    toast.error(err.response?.data?.message || err.message);
  }
  }

  const productsList = product.map((product) => (
    
    <div key={product._id} className=' flex flex-col w-[250px] border h-auto object-top rounded-2xl ml-3'>
      <img src={product.image} alt={product.name} className=' rounded-t-2xl h-[200px]' />
      <div className=' p-2'>
      <h1>{product.name}</h1>
      <h2>{product.description}</h2>
      <p>{product.price} $</p>
      <button
  className='bg-blue-600 hover:bg-blue-500 p-2 rounded-xl w-[230px]'
  onClick={(e) => user ? handleAddToCart(e, product._id) : null}
>
  {user ? 'Add to Cart' : <Link to='/login'>Add to Cart</Link>}
</button>

      </div>
      
    </div>
    
  ));

  return <div className='flex flex-row gap-15 ml-14 mt-5'>{productsList}</div>;
};

export default Products;
