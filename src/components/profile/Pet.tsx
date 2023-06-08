import React from "react";

interface PetProps {
    pet: {
        ownerId: string;
        name: string;
        type: string;
        breed: string;
        foodAllergies: string;
        congenitalDisease: string;
        image: string;
        description?: string;
    };
}

const Pet = ({ pet }: PetProps) => {
    return (
        <li className="pet">
            <img src={pet.image} alt={pet.name} />
            <div>
                <h4>{pet.name}</h4>
                <p>{`${pet.type} (${pet.breed})`}</p>
            </div>
        </li>
    );
};

export default Pet;
