import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import productsServices from '../services/productsServices';
import { toast } from 'react-toastify';
import { selectSingleProduct, setSingleProduct } from '../redux/features/home/productSlice';

const ProductDetails = () => {
  const { id } = useParams(); // ✅ Get product ID from URL
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct); // ✅ Get single product from Redux

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await productsServices.productDetails(id); // ✅ Just pass id
        dispatch(setSingleProduct(response.data)); // ✅ Set in Redux
      } catch (err) {
        toast.error(err.message || 'Failed to load product details');
      }
    };

    fetchProductDetails();
  }, [dispatch, id]);

  if (!product) {
    return <div className="text-center mt-10">Loading product details...</div>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <img src={product.image} alt={product.name} className="w-[200px] h-[200px] object-cover rounded-xl mb-6" />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold text-green-600">{product.price} $</p>
    </div>
  );
};

export default ProductDetails;
