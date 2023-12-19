import { apiSlice } from "../../api/apiSlice";

type Price = {
    [key: string]: number;
};

interface ServiceState {
    step: number;
    tier: string | null;
    pets: Pet[];
    time: Date | null;
    price: Price;
}

interface Pet {
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

export const servicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkout: builder.mutation({
            query: (service: ServiceState) => ({
                url: "/create-checkout-session",
                method: "POST",
                body: service,
            }),
        }),
    }),
});

export const { useCheckoutMutation } = servicesApiSlice;
