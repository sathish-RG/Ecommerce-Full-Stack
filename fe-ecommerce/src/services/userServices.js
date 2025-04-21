import instance from "./instance";

const userServices={
  addToCart:async(productId,data)=>{
    return await instance.post(`/user/cart/${productId}`,data);
  },
  GetAllCart:async()=>{
    return await instance.get('/user/cart');
  },
  deleteCart:async(productId)=>{
    return await instance.delete(`/user/cart/${productId}`);
  },
  addQuantity: async (productId, { quantity }) => {
    return await instance.put(`/user/cart/update/${productId}`, { quantity });
  },
  placeOrder: async (orderData)=>{
    return await instance.post(`/order/place`,orderData)
  }
}
export default userServices;