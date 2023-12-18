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

type Price = {
    [key: string]: number;
};

export interface StoreState {
    auth: {
        user: string | null; // Replace YourUserType with the actual type of your user object
        roles: string[]; // Assuming roles are represented as an array of strings
        token: string | null; // Assuming token is a string or null
    };
    services: {
        step: number;
        tier: string | null;
        pets: Pet[];
        time: Date | null;
        price: Price;
    };
}
