import { apiSlice } from "../../api/apiSlice";

interface User {
    _id: string;
    username: string;
    roles: Role[];
    name?: string;
    pets: IPet[];
    avatarFileKey?: string;
}

interface Role {
    User: 2001;
    Admin?: 5150;
}
interface IPet {
    _id: string;
    ownerId: string;
    name: string;
    type: string;
    breed: string;
    foodAllergies: string;
    congenitalDisease: string;
    image: string;
    description?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, null>({
            query: () => "/profile",
            providesTags: ["User", "Pets"],
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
