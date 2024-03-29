import React from "react";

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
interface PetProps {
    pet: IPet;
    setSelectedPet: React.Dispatch<React.SetStateAction<IPet | null>>;
}

const Pet = ({ pet, setSelectedPet }: PetProps) => {
    return (
        <li
            className="pet"
            onClick={() => {
                setSelectedPet(pet);
                console.log(pet);
            }}
        >
            <img src={`http://localhost:3500/images/${pet.image}`} alt={pet.name} />
            <div className="petShortDesc">
                <h4>{pet.name}</h4>
                <p>{`${pet.type} (${pet.breed})`}</p>
            </div>
        </li>
    );
};

export default Pet;
