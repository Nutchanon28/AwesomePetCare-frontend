import { apiSlice } from "../../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => "/users",
        }),
    }),
});

export const { useGetAllUserQuery } = adminApiSlice;
