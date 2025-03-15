import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" }); // Enables validation on change


  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/register`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.status === 201 && response?.data?.success === true) {
        toast.success(response?.data?.message, {
          duration: 3000,
          position: "bottom-center",
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
          removeDelay: 1000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000)
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message)
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-10">
      <div className="max-w-[350px] w-full bg-gradient-to-b from-white to-pink-100 rounded-[40px] p-6 border-5 border-white shadow-[0px_30px_30px_-20px_rgba(255,255,255,0.88)] m-5">
        <div className="text-center font-black text-2xl text-primary-text">Register</div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <input
            {...register("userName", { required: "Username is required" })}
            className="max-w-[350px] w-full bg-white border-none px-5 py-4 rounded-[20px] mt-4 shadow-[0px_10px_10px_-5px_#f9dabf] focus:outline-none focus:border-[#453006] focus:ring-2 focus:ring-[#453006]"
            type="text"
            placeholder="Username"
          />
          {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}

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
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/, // Indian number format
                message: "Enter a valid 10-digit Indian mobile number",
              },
            })}
            className="max-w-[350px] w-full bg-white border-none px-5 py-4 rounded-[20px] mt-4 shadow-[0px_10px_10px_-5px_#f9dabf] focus:outline-none focus:border-[#453006] focus:ring-2 focus:ring-[#453006]"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Mobile"
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}



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


          <button
            className="w-full font-bold cursor-pointer bg-gradient-to-r from-red-600 to-red-400 text-white py-4 mt-5 rounded-[20px] shadow-[0px_20px_10px_-15px_rgba(255,255,255,0.88)] transition-transform duration-200 hover:scale-3d hover:shadow-[0px_23px_10px_-20px_rgba(255,255,255,0.88)] active:scale-95 active:shadow-[0px_15px_10px_-10px_rgba(133,189,215,0.88)]"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="mt-6">
          <span className="block text-center text-xs primary-text">
            Already registered? <Link to="/login" className="text-button-background font-medium">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
