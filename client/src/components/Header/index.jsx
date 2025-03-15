import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { essentialData } from "../../utils/utils";
import { getUserNameForHeader } from "../../utils/commonUtils";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader";

const Header = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useContext(GlobalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // const handleLogout = async () => {
  //   try {
  //     console.log("Logging out...");

  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/api/v1/admin/logout`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${localStorage.getItem("authToken")}`
  //         }
  //       }
  //     );

  //     console.log(response);

  //     if (response.status === 200) {
  //       localStorage.removeItem("authToken");
  //       localStorage.removeItem("refreshToken");

  //       setTimeout(() => {
  //         navigate("/login", { replace: false });
  //       }, 2000);

  //       toast.success(response?.data?.message);
  //     }


  //     setIsDropdownOpen(false);
  //   } catch (error) {
  //     toast.error(error.response ? error.response.data : error.message);
  //   }
  // };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/logout`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");

        setTimeout(() => {
          navigate("/login", { replace: false });
        }, 2000);

        toast.success(response?.data?.message);
      }

      setIsDropdownOpen(false);
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className={`w-full px-12 md:px-12 shadow-md py-4 flex justify-between items-center ${theme === "light" ? "shadow-bg-light-theme" : "shadow-bg-dark-theme"}`}>
      <Link to="/" className="text-xl font-semibold text-primary-text cursor-pointer">
        BirthdayWish
      </Link>
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 border rounded-full flex items-center justify-center cursor-pointer border-primary-text
            ${theme === "light" ? "shadow-md" : "shadow-md"}
          `}
          onClick={() => toggleTheme(essentialData?.dark)}
        >
          {theme === "light" ? (
            <SunIcon className="w-5 h-5 text-primary-text" />
          ) : (
            <MoonIcon className="w-5 h-5 text-white" />
          )}
        </div>

        {
          localStorage.getItem("authToken") && (
            <div className="relative">
              {/* User avatar and name */}
              <div className="w-10 h-10 rounded-full border border-primary-text flex justify-center items-center cursor-pointer" onClick={toggleDropdown}>
                <span className="text-primary-text font-bold text-sm">
                  {getUserNameForHeader("John Doe")}
                </span>
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <>
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition duration-200"
                    >
                      Logout
                    </button>
                  </div>

                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black opacity-50 z-5"
                    onClick={() => setIsDropdownOpen(false)}  // Close the dropdown when clicking the overlay
                  />
                </>
              )}
            </div>
          )
        }
      </div>

      {loading && <Loader />}
    </nav>
  )
}

export default Header;