import {
  CircleUserRound,
  Clapperboard,
  HouseIcon,
  LayoutGridIcon,
  LogInIcon,
  LogOutIcon,
  UserCircle2Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useLogoutMutation } from "../api/auth";
import { logout } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../store";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const [logOutUser] = useLogoutMutation();

  const handleLogout = () => {
    logOutUser(user);
    dispatch(logout());
    navigate("/auth/signin");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#06071f] border w-[90%] sm:w-[50%] lg:w-[20%] px-6 py-3 rounded-full shadow-lg flex justify-between items-center">
      {/* Left side: Home and Movies */}
      <div className="flex gap-6">
        <Link
          to="/"
          className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition-all ease-in-out duration-300"
        >
          <HouseIcon size={24} />
          <span className="text-xs text-white ">Home</span>
        </Link>
        <Link
          to="/movies"
          className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition"
        >
          <Clapperboard size={24} />
          <span className="text-xs text-white">Movies</span>
        </Link>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className="flex flex-col items-center gap-1 text-gray-800 hover:text-blue-600 transition"
            >
              <UserCircle2Icon size={24} />
              <span className="text-xs font-extrabold text-white capitalize">
                {user.username
                  .split(" ")
                  .map((name: string) => name[0].toUpperCase())
                  .join("")}
              </span>
            </Link>
            {user.type === "ADMIN" && (
              <Link
                to="/admin/movies/dashboard"
                className="flex flex-col items-center gap-1 text-gray-800 hover:text-blue-600 transition"
              >
                <LayoutGridIcon size={22} />
                <span className="text-xs text-white">Admin</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 text-gray- cursor-pointer hover:text-red-600 transition"
            >
              <LogOutIcon size={22} />
              <span className="text-xs text-white">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth/signin"
              className="flex flex-col items-center gap-1 text-gray-800 hover:text-blue-600 transition"
            >
              <LogInIcon size={22} />
              <span className="text-xs">Sign In</span>
            </Link>
            <Link
              to="/auth/signup"
              className="flex flex-col items-center gap-1 text-gray-800 hover:text-blue-600 transition"
            >
              <CircleUserRound size={22} />
              <span className="text-xs">Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
