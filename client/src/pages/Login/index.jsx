import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/api/v1/admin/login`,
  //       data,
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     console.log(response);
      

  //     if (response?.data?.status === 200 && response?.data?.success === true) {
  //       toast.success(response?.data?.message, {
  //         duration: 3000,
  //         position: "bottom-center",
  //         iconTheme: {
  //           primary: '#000',
  //           secondary: '#fff',
  //         },
  //         ariaProps: {
  //           role: 'status',
  //           'aria-live': 'polite',
  //         },
  //         removeDelay: 1000,
  //       });

  //       navigate("/");
  //     }
  //   } catch (error) {
  //     toast.error(error.response ? error.response.data : error.message)
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/login`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response?.data?.status === 200 && response?.data?.success === true) {
        toast.success(response?.data?.message);
  
        // Store token before redirect
        localStorage.setItem("authToken", response?.data?.accessToken);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="w-full flex justify-center items-center p-10">
      <div className={`max-w-[350px] rounded-[40px] p-6 border-5 m-5 ${theme === "light" ? "bg-gradient-to-b from-white to-pink-100 border-white shadow-[0px_30px_30px_-20px_rgba(255,255,255,0.88)]" : "border-primary-text bg-gradient-to-b from-[#35271c] to-[#171010]"}`}>
        <div className="text-center font-black text-2xl text-primary-text">Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            className="max-w-[350px] w-full bg-white border-none px-5 py-4 rounded-[20px] mt-4 shadow-[0px_10px_10px_-5px_#f9dabf] focus:outline-none focus:border-[#453006] focus:ring-2 focus:ring-[#453006]"
            type="email"
            placeholder="E-mail"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full bg-white border-none px-5 py-4 rounded-[20px] mt-4 shadow-[0px_10px_10px_-5px_#f9dabf] focus:outline-none focus:border-[#453006] focus:ring-2 focus:ring-[#453006]"
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

          <span className="block mt-2 ml-2 text-xs text-primary-text">
            <a href="#">Forgot Password?</a>
          </span>
          
          <button
            className="w-full font-bold bg-gradient-to-r from-red-600 to-red-400 text-white py-4 mt-5 rounded-[20px] shadow-[0px_20px_10px_-15px_rgba(255,255,255,0.88)] transition-transform duration-200 hover:scale-105 hover:shadow-[0px_23px_10px_-20px_rgba(255,255,255,0.88)] active:scale-95 active:shadow-[0px_15px_10px_-10px_rgba(133,189,215,0.88)]"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="mt-6">
          <span className="block text-center text-xs primary-text">Not register yet <Link to="/register" className="text-button-background font-medium">Register</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login;