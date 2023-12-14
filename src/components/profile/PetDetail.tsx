import React from "react";
import { FaPlus, FaEdit, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../css/profile/PetDetail.css";
import { useDeletePetMutation } from "../../features/pets/petsApiSlice";

interface IPet {
    pet: {
        _id: string;
        ownerId: string;
        name: string;
        type: string;
        breed: string;
        foodAllergies: string;
        congenitalDisease: string;
        image: string;
        description?: string;
    } | null;
}

const PetDetail = ({ pet }: IPet) => {
    const navigate = useNavigate();
    const [deletePet] = useDeletePetMutation();

    const handleDelete = async () => {
        try {
            const result = await deletePet(pet?._id).unwrap();
            localStorage.removeItem("selectedPet");
            window.location.reload();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="petDetail">
            <div className="petCrud">
                <FaPlus
                    style={{ color: "#333" }}
                    onClick={() => navigate("/add_pet")}
                />
                {pet && (
                    <>
                        <FaEdit
                            style={{ color: "#333" }}
                            onClick={() => navigate("/edit_pet")}
                        />
                        <FaMinus
                            style={{ color: "#333" }}
                            onClick={handleDelete}
                        />
                    </>
                )}
            </div>
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
                    <p style={{ fontWeight: "bold" }}>Congenital Disease</p>
                    <p>{pet.congenitalDisease}</p>
                    <p style={{ fontWeight: "bold" }}>Description</p>
                    <p>{pet.description ?? "-"}</p>
                </>
            ) : (
                <p>No pet selected</p>
            )}
        </div>
    );
};

export default PetDetail;
