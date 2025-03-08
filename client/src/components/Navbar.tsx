import {
  Clapperboard,
  HouseIcon,
  LayoutGridIcon,
  LogInIcon,
  LogOutIcon,
  UserCircle2Icon,
  UserRoundPlusIcon,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../api/auth";
import { logout } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../store";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [logOutUser] = useLogoutMutation();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logOutUser(user);
    dispatch(logout());
    navigate("/auth/signin");
  };

  return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#d9daef] border w-[90%] sm:w-[60%] lg:w-[40%] px-6 py-3 rounded-full shadow-lg flex justify-between items-center">
      {/* Left side: Home and Movies */}
      <div className="flex gap-6">
        <Link
          to="/"
          className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition"
        >
          <HouseIcon size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/movies"
          className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition"
        >
          <Clapperboard size={24} />
          <span className="text-xs">Movies</span>
        </Link>
      </div>

      {/* User Section */}
      <div className="relative">
        {user ? (
          <>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 text-gray-800 focus:outline-none hover:text-blue-600 transition"
            >
              <span className="text-sm font-medium">{user.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden text-gray-700">
                {user.type === "ADMIN" && (
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <LayoutGridIcon size={20} />
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <UserCircle2Icon size={20} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-100"
                  >
                    <LogOutIcon size={20} />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          // Show Sign In and Sign Up if user is not logged in
          <div className="flex gap-4">
            <Link
              to="/auth/signin"
              className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition"
            >
              <LogInIcon size={24} />
              <span className="text-xs">Sign In</span>
            </Link>
            <Link
              to="/auth/signup"
              className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition"
            >
              <UserRoundPlusIcon size={24} />
              <span className="text-xs">Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
