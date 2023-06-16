import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/profile/PetDetail.css";

interface IPet {
    pet: {
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
    return (
        <div className="petDetail">
            <Link to="/add_pet" className="plusIcon">
                <FaPlus style={{ color: "#333" }} />
            </Link>
            {pet != null ? (
                <>
                    <div className="petHeader">
                        <img src={`http://localhost:3500/images/${pet.image}`} alt={pet.name} />
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
