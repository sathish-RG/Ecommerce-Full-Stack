import instance from "./instance";

const productsServices = {
  // ✅ Get all products
  product: async () => {
    return await instance.get("/user/products");
  },

  // ✅ Get product details by ID
  productDetails: async (id) => {
    return await instance.get(`/user/product/${id}`);
  },
};

export default productsServices;
