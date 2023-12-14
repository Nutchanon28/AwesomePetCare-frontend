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
        }),
        // Sending a form-data make the request body empty. This can't be used. This works now for some reason???
        addPet: builder.mutation({
            query: (petFormData: FormData) => ({
                url: "/pet",
                method: "POST",
                // headers: {
                //     "Content-Type": "multipart/form-data;",
                // },
                body: petFormData,
                formData: true,
            }),
            invalidatesTags: ["Pets"],
        }),
        editPet: builder.mutation({
            query: (pet) => ({
                url: `/pet/${pet.id}`,
                method: "PUT",
                // headers: {
                //     "Content-Type": "multipart/form-data;",
                // },
                body: pet.formData,
                formData: true,
            }),
            invalidatesTags: ["Pets"],
        }),
    }),
});

export const { useGetPetsQuery, useInvalidatePetCacheMutation, useAddPetMutation, useEditPetMutation } = petsApiSlice;
