import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import productsServices from '../services/productsServices';
import { selectProduct, setProduct } from '../redux/features/home/productSlice';
import userServices from '../services/userServices';
import { setCart } from '../redux/features/home/cartSlice';
import { selectUser } from '../redux/features/auth/userSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);

  // 🔹 State for category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 🔹 Load all products once component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsServices.product();
        dispatch(setProduct(response.data));
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // 🔹 Function to add a product to cart
  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      const cartData = { quantity: 1 };
      await userServices.addToCart(productId, cartData);

      const response = await userServices.GetAllCart();
      dispatch(setCart(response.data.cart));

      toast.success('Product added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // 🔹 Define category buttons
  const categories = ['All', 'Mobiles', 'Gadgets', 'Cloths'];

  // 🔹 Filtered products based on selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? product
      : product.filter((p) => p.category === selectedCategory);

  return (
    <div className="px-6 py-4">
      {/* 🔸 Category Tags */}
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔸 Products Grid */}
      <div className="flex flex-wrap w-full gap-18 ml-10 justify-start">
        {filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col w-[250px] border rounded-2xl shadow-md overflow-hidden"
            >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-[200px] object-cover w-full"
              />
            </Link>
              <div className="p-3">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-1">{product.description}</p>
                <p className="text-md font-bold mb-2">{product.price} $</p>
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl w-full"
                  onClick={(e) =>
                    user ? handleAddToCart(e, product._id) : null
                  }
                >
                  {user ? 'Add to Cart' : <Link to="/login">Add to Cart</Link>}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
