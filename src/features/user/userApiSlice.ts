import { apiSlice } from "../../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "/profile",
            providesTags: ["User"],
        }),
        editUser: builder.mutation({
            query: (name) => ({
                url: "/profile",
                method: "PUT",
                body: { name },
            }),
            invalidatesTags: ["User"],
        }),
        editUserAvatar: builder.mutation({
            query: (image) => ({
                url: "/profile/avatar",
                method: "PUT",
                body: image,
                formData: true,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useEditUserMutation,
    useEditUserAvatarMutation,
} = userApiSlice;
