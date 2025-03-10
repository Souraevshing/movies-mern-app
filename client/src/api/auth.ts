import { apiSlice, BASE_URL } from "./apiSlice";

export const loginUser = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/auth/users/login`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/auth/users/signup`,
        method: "POST",
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/auth/users/signin`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLogoutMutation, useSignupMutation, useSigninMutation } =
  loginUser;
