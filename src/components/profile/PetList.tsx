import React from "react";
import Pet from "./Pet";
import "../../css/profile/PetList.css";
import { useGetPetsQuery } from "../../features/pets/petsApiSlice";

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

interface PetListProps {
    // pets: IPet[] | undefined;
    setSelectedPet: React.Dispatch<React.SetStateAction<IPet | null>>;
}

const PetList = ({ setSelectedPet }: PetListProps) => {
    const {
        data: pets = [],
        isLoading,
        isError,
        error,
        isSuccess,
    } = useGetPetsQuery(null);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <ul className="petList">
                {pets?.map((pet) => {
                    return (
                        <Pet
                            key={pet.name}
                            pet={pet}
                            setSelectedPet={setSelectedPet}
                        />
                    );
                })}
            </ul>
        );
    } else if (isError) {
        console.log(error);
    }

    return content;
};

export default PetList;
