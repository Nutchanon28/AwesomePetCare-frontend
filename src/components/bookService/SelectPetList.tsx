import React, { useState } from "react";
import PetList from "../profile/PetList";
import PetDetail from "../profile/PetDetail";
import { useDispatch, useSelector } from "react-redux";
import {
    addPet,
    removePet,
    selectCurrentService,
} from "../../features/services/servicesSlice";
import { FaPlus, FaMinus } from "react-icons/fa";

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

const SelectPetList = () => {
    const services = useSelector(selectCurrentService);
    const dispatch = useDispatch();
    const [pet, setPet] = useState<Pet | null>(null);

    const isPetFound = (id: string) =>
        services.pets.find((selectedPet) => selectedPet._id === id);

    return (
        <>
            <p>Select your pet(s):</p>
            <div className="petSection">
                <PetList setSelectedPet={setPet} />
                <div className="petDetail">
                    {pet && (
                        <div className="petCrud">
                            <FaPlus
                                style={{ color: "#333" }}
                                onClick={() => dispatch(addPet(pet))}
                            />
                            {isPetFound(pet._id) && (
                                <FaMinus
                                    style={{ color: "#333" }}
                                    onClick={() => dispatch(removePet(pet._id))}
                                />
                            )}
                        </div>
                    )}
                    {pet != null ? (
                        <>
                            <div className="petHeader">
                                <img
                                    src={`http://localhost:3500/images/${pet.image}`}
                                    alt={pet.name}
                                />
                                <div className="petName">
                                    <h3>{pet.name}</h3>
                                    <p>{`${pet.type} (${pet.breed})`}</p>
                                </div>
                            </div>
                            <p style={{ fontWeight: "bold" }}>Food Allergies</p>
                            <p>{pet.foodAllergies}</p>
                            <p style={{ fontWeight: "bold" }}>
                                Congenital Disease
                            </p>
                            <p>{pet.congenitalDisease}</p>
                            <p style={{ fontWeight: "bold" }}>Description</p>
                            <p>{pet.description ?? "-"}</p>
                        </>
                    ) : (
                        <p>No pet selected</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SelectPetList;
