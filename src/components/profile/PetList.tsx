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
    // pets: IPet[] | undefined;
    setSelectedPet: React.Dispatch<React.SetStateAction<IPet | null>>;
}

const PetList = ({ setSelectedPet }: PetListProps) => {
    const {
        data: user,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useGetUserQuery(null);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <ul className="petList">
                {user.pets?.map((pet) => {
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
