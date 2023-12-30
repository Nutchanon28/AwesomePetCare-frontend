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

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query<User[], null>({
            query: () => "/users",
        }),
        getUserByUsername: builder.query<User, string>({
            query: (username) => `/users/${username}`,
        }),
    }),
});

export const { useGetAllUserQuery, useGetUserByUsernameQuery } = adminApiSlice;
