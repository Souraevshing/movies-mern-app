import { useCallback, useState } from "react";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(e);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

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
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer flex justify-center items-center`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
