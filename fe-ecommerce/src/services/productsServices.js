import instance from "./instance";

const productsServices={
  product:async(data)=>{
    return await instance.get('/user/products',data);
  }
}
export default productsServices;