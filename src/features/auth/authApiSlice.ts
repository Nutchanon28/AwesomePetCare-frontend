import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET",
            }),
        }),
        refresh: builder.query({
            query: () => "/refresh",
        }),
    }),
});

export const { useLoginMutation, useLogOutMutation, useRefreshQuery } =
    authApiSlice;