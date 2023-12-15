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
        register: builder.mutation({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET",
            }),
            invalidatesTags: ["Pets", "User"],
        }),
        refresh: builder.query({
            query: () => "/refresh",
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogOutMutation,
    useRefreshQuery,
} = authApiSlice;
