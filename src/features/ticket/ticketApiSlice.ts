import { apiSlice } from "../../api/apiSlice";

export const ticketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => "/ticket",
            providesTags: ["Tickets"],
        }),
    }),
});

export const { useGetTicketsQuery } = ticketApiSlice;
