import axios from 'axios';

const baseURL= 'http://localhost:5000/api/v1'

const instance=axios.create({
  baseURL,
  timeout:10000,
  headers:{
    'Content-type':'application/json',
  },
  withCredentials:true,
});
export default instance;