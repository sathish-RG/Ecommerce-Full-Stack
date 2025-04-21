import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearUser, selectUser } from "../redux/features/auth/userSlice";
import authServices from "../services/authServices";
import { toast } from "react-toastify";
import { selectCart, setCart } from "../redux/features/home/cartSlice";
import { useEffect } from "react";
import userServices from "../services/userServices";

const Navbar = () => {
  const cart = useSelector(selectCart);
  const user= useSelector(selectUser);
  const totalCartCount =
   cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const dispatch = useDispatch();

  useEffect(() => {
    const countNumberUpdate = async () => {
      try {
        if(user){
        const response = await userServices.GetAllCart();
        dispatch(setCart(response.data.cart));
        }
      } catch (err) {
        console.error("Error fetching cart:", err.message);
      }
    };

    countNumberUpdate();
  }, [dispatch,user]); // Only run once on component mount

  const navigate = useNavigate();
 

  const handleLogout = async (e) => {
    e.preventDefault();
    //call the logout function from authService
    try {
      const response = await authServices.logout();
      if (response.status == 200) {
        toast.success("Logout successfully");
        localStorage.removeItem("user");
        dispatch(clearUser());
        navigate("/");
      }
    } catch (err) {
      toast.error("logout error:", err.message);
    }
  };

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between bg-gray-400 h-20 w-full p-4">
        <div>
          <h1 className=" text-3xl font-bold text-white">
            <Link to="/home">Trendy Cart</Link>
          </h1>
        </div>
        <div>
          {!user ? (
            <ul className="flex flex-row gap-4">
              <li className=" text-2xl font-bold text-white">
                <Link to="/register">Register</Link>
              </li>
              <li className=" text-2xl font-bold text-white">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          ) : (
            <div className=" flex flex-row gap-2 align-middle justify-center">
              <p className=" p-2 text-2xl font-bold text-white">
                <Link to="/home">{user.name}</Link>
              </p>
              {user && <div className=" p-2 text-2xl font-bold text-white flex flex-row gap-2">
                <Link to="/cart">Cart</Link>
                <div className="relative">
                  <i className="fa fa-shopping-cart text-2xl"></i>
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                      {totalCartCount}
                    </span>
                  )}
                </div>
              </div>}
              <button
                onClick={handleLogout}
                className=" p-2 bg-red-500 hover:bg-red-600 rounded-xl text-2xl font-bold text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
