import { apiSlice } from "../../api/apiSlice";

export const petsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPets: builder.query({
            query: () => "/pet",
            providesTags: ["Pets"],
        }),
        invalidatePetCache: builder.mutation({
            query: () => "",
            invalidatesTags: ["Pets"],
        })
        // Sending a form-data make the request body empty. This can't be used.
        // addPet: builder.mutation({
        //     query: (petFormData: FormData) => ({
        //         url: "/pet",
        //         method: "POST",
        //         // headers: {
        //         //     "Content-Type": "multipart/form-data;",
        //         // },
        //         body: { petFormData },
        //         formData: true,
        //     }),
        //     invalidatesTags: ["Pets"],
        // }),
    }),
});

export const { useGetPetsQuery, useInvalidatePetCacheMutation } = petsApiSlice;
