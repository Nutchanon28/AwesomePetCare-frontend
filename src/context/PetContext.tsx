import React, {
    ReactElement,
    useCallback,
    useReducer,
    createContext,
} from "react";

type Pet = {
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

type PetState = {
    pets: Pet[],
    
}