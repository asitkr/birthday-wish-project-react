import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      // Convert dateOfBirth from "YYYY-MM-DD" to "DD/MM/YYYY"
      if (data.dateOfBirth) {
        const formattedDate = moment(data.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY"); // Use `/` instead of `-`
        data.dateOfBirth = formattedDate;
      }

      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Unauthorized: No access token found");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/add-user`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === 200 && response?.data?.success === true) {
        toast.success(response?.data?.message);
        reset();
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };



  return (
    <div className="w-full flex justify-center items-center p-10">
      <div className={`max-w-[350px] rounded-[40px] p-6 border-5 m-5 ${theme === "light" ? "bg-gradient-to-b from-white to-pink-100 border-white shadow-[0px_30px_30px_-20px_rgba(255,255,255,0.88)]" : "border-primary-text bg-gradient-to-b from-[#35271c] to-[#171010]"}`}>
        <div className="text-center font-black text-2xl text-primary-text">Add user data for birthday</div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <input
            {...register("userName", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 10,
                message: "Username must be less than or equal to 10 characters long",
              },
            })}
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
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description must be less than 500 characters",
              },
            })}
            className="max-w-[350px] w-full bg-white border-none px-5 py-4 rounded-[20px] mt-4 shadow-[0px_10px_10px_-5px_#f9dabf] focus:outline-none focus:border-[#453006] focus:ring-2 focus:ring-[#453006]"
            type="text"
            placeholder="Description"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}


          <input
            {...register("dateOfBirth", { required: "Date Of Birth is required" })}
            className="max-w-[350px] w-full bg-white border-none px-5 py-4 rounded-[20px] mt-4 shadow-[0px_10px_10px_-5px_#f9dabf] focus:outline-none focus:border-[#453006] focus:ring-2 focus:ring-[#453006]"
            type="date"
            placeholder="Date of Birth"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}

          <button
            className="w-full font-bold bg-gradient-to-r from-red-600 to-red-400 text-white py-4 mt-5 rounded-[20px] shadow-[0px_20px_10px_-15px_rgba(255,255,255,0.88)] transition-transform duration-200 hover:scale-105 hover:shadow-[0px_23px_10px_-20px_rgba(255,255,255,0.88)] active:scale-95 active:shadow-[0px_15px_10px_-10px_rgba(133,189,215,0.88)]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home;