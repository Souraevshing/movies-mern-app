import { apiSlice, BASE_URL } from "../features/api/apiSlice";

export const loginUser = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/auth/users/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginUser;
