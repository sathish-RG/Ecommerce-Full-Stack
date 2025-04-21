
import{useSelector,  useDispatch} from 'react-redux'
import { selectEmail, selectName, selectPassword, setEmail, setName, setPassword } from '../redux/features/auth/registerSlice'
import { useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';
import { toast } from 'react-toastify';

const Register = () => {

 const name=useSelector(selectName);
 const email=useSelector(selectEmail);
 const password=useSelector(selectPassword);

 const dispatch=useDispatch();
 const navigate=useNavigate();

 const handleRegister=async (e)=>{
  e.preventDefault();
  //call the register function from authService
  try{
   const response=await authServices.register({name,email,password})

   if (response.status==201){
    toast.success('Register successfully')
   }
   //clear the form
   dispatch(setName(''));
   dispatch(setEmail(''));
   dispatch(setPassword(''));

   //redirect to the login page
   setTimeout(()=>{
    navigate('/')
   },500);
  }catch (err) {
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    toast.error("Register error:", message);
  }
 }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full mt-[50px]'>
    <div className=' flex flex-col items-center justify-center bg-gray-200 border border-gray-600 h-[400px] w-[400px] gap-4 rounded-xl'>
      <h1 className=' text-3xl font-bold text-black'>Register</h1>
      <form className='flex flex-col gap-4 items-center justify-center' onSubmit={handleRegister}>
  <input
    type="text"
    placeholder="Username"
    value={name}
    onChange={(e) => dispatch(setName(e.target.value))}
    className=' w-[300px] h-10 p-1 bg-gray-300 rounded'
  />
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => dispatch(setEmail(e.target.value))}
    className=' w-[300px] h-10 p-1 bg-gray-300 rounded'
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => dispatch(setPassword(e.target.value))}
    className=' w-[300px] h-10 p-1 bg-gray-300 rounded'
  />
  <button
    type="submit"
    className=' p-2 bg-blue-500 hover:bg-blue-700 rounded-xl text-2xl font-bold text-black'
  >
    Register
  </button>
</form>

    </div>
    </div>
  )
}

export default Register