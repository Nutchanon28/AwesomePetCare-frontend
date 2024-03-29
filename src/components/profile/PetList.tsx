import React from "react";
import Pet from "./Pet";
import "../../css/profile/PetList.css";
import { useGetUserQuery } from "../../features/user/userApiSlice";
// import { useGetPetsQuery } from "../../features/pets/petsApiSlice";

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
    pets?: IPet[] | null;
    setSelectedPet: React.Dispatch<React.SetStateAction<IPet | null>>;
}

const PetList = ({ pets, setSelectedPet }: PetListProps) => {
    const {
        data: user,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useGetUserQuery(null);
    const petList = pets ? pets : user?.pets ?? [];

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <ul className="petList">
                {petList.map((pet) => {
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
