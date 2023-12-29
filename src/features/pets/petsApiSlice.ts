import { apiSlice } from "../../api/apiSlice";

export const petsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getPets: builder.query<IPet[], null>({
        //     query: () => "/pet",
        //     providesTags: ["Pets"],
        // }),
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
                body: pet.formData,
                formData: true,
            }),
            invalidatesTags: ["Pets"],
        }),
        deletePet: builder.mutation({
            query: (id) => ({
                url: `/pet/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pets"],
        }),
    }),
});

export const { useAddPetMutation, useEditPetMutation, useDeletePetMutation } =
    petsApiSlice;
