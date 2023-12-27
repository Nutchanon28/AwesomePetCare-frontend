import { apiSlice } from "../../api/apiSlice";

export const servicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => "/ticket",
            providesTags: ["Tickets"],
        }),
    }),
});

export const { useGetTicketsQuery } = servicesApiSlice;
