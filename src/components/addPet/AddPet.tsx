import React, { useState } from "react";
import "../../css/addPet/AddPet.css";

const AddPet = () => {
    // TODO: learn about --legacy-peer-deps
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [foodAllergies, setFoodAllergies] = useState("");
    const [congenitalDisease, setCongenitalDisease] = useState("");
    const [image, setImage] = useState("");

    return (
        <form className="addPetForm">
            <label htmlFor="name">Name</label>
            <input
                required
                id="name"
                placeholder="name"
                autoComplete="off"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="type">Type</label>
            <input
                required
                id="type"
                placeholder="type"
                autoComplete="off"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="breed">Breed</label>
            <input
                required
                id="breed"
                placeholder="breed"
                autoComplete="off"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
            />
            <label htmlFor="foodAllergies">Food Allergies</label>
            <input
                required
                id="foodAllergies"
                placeholder="foodAllergies"
                autoComplete="off"
                type="text"
                value={foodAllergies}
                onChange={(e) => setFoodAllergies(e.target.value)}
            />
            <label htmlFor="congenitalDisease">Congenital Disease</label>
            <input
                required
                id="congenitalDisease"
                placeholder="congenitalDisease"
                autoComplete="off"
                type="text"
                value={congenitalDisease}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddPet;
