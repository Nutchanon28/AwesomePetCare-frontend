import React from "react";
import Pet from "./Pet";
import "../../css/profile/PetList.css";

interface IPet {
    ownerId: string;
    name: string;
    type: string;
    breed: string;
    foodAllergies: string;
    congenitalDisease: string;
    image: string;
    description?: string;
}

interface PetListProps {
    pets: IPet[] | undefined;
    setSelectedPet: React.Dispatch<React.SetStateAction<IPet | null>>;
}

const PetList = ({ pets, setSelectedPet }: PetListProps) => {
    console.log(pets);
    return (
        <ul className="petList">
            {pets?.map((pet) => {
                return <Pet key={pet.name} pet={pet} setSelectedPet={setSelectedPet}/>;
            })}
        </ul>
    );
};

export default PetList;
