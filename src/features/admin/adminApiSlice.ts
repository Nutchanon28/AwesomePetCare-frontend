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

interface ITicket {
    _id: string;
    userId: User;
    petsId: IPet[];
    service: string;
    datetime: Date;
    price: number;
    status: string;
}

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query<User[], null>({
            query: () => "/users",
        }),
        getUserByUsername: builder.query<User, string>({
            query: (username) => `/users/${username}`,
        }),
        getAllTicket: builder.query<ITicket[], null>({
            query: () => "/ticket/admin",
            providesTags: ["Tickets"],
        }),
    }),
});

export const { useGetAllUserQuery, useGetUserByUsernameQuery, useGetAllTicketQuery } = adminApiSlice;
