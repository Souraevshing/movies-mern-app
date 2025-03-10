import { LoaderIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useSigninMutation } from "../api/auth";
import { saveUser } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../store";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const redirect = query.get("redirect") || "/";

  const [signin, { isLoading, error }] = useSigninMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { email, password } = userInfo;
      const res = await signin({ email, password }).unwrap();
      dispatch(saveUser({ ...res }));
      toast.promise(res, {
        loading: "Signing in...",
        success: "Signed in successfully",
        error: "Error signing in",
      });
      navigate(redirect);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  useEffect(() => {
    if (error) {
      if ("status" in error) {
        if (error.status === 401) {
          toast.error("Invalid credentials");
        } else if (error.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Error signing in");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  }, [error]);

  return (
    <div className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Browse movies</h1>
        <form onSubmit={handleSubmit} className="container w-[40rem]">
          {/* email */}
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              onChange={(e) => handleChange(e)}
              value={userInfo.email}
            />
          </div>

          {/* password */}
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              autoComplete="password"
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              onChange={(e) => handleChange(e)}
              value={userInfo.password}
            />
          </div>
          <button
            disabled={isLoading}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer flex justify-center items-center`}
          >
            {isLoading ? (
              <LoaderIcon className="w-6 h-6 transform animate-spin transition-all" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
