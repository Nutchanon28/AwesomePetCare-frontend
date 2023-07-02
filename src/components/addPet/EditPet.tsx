import React, { useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useNavigation } from "react-router-dom";
import "../../css/addPet/AddPet.css";

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

const EditPet = () => {
    // TODO: learn about --legacy-peer-deps
    // TODO: how would the backend check which pet need to be edited
    const storedPet = localStorage.getItem("selectedPet");
    const pet: IPet | null = storedPet ? JSON.parse(storedPet) : null;
    const [name, setName] = useState(pet?.name ?? "");
    const [type, setType] = useState(pet?.type ?? "");
    const [breed, setBreed] = useState(pet?.breed ?? "");
    const [foodAllergies, setFoodAllergies] = useState(
        pet?.foodAllergies ?? ""
    );
    const [congenitalDisease, setCongenitalDisease] = useState(
        pet?.congenitalDisease ?? ""
    );
    const [image, setImage] = useState<File | null>(null);
    const [imagePath, setImagePath] = useState(pet?.image ?? "");
    const addImageLink =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png";
    const hiddenImageInputRef = useRef<HTMLInputElement>(null);
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            setImage(file);

            reader.onload = () => {
                setImagePath(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const editedPet = {
            name,
            type,
            breed,
            foodAllergies,
            congenitalDisease,
            image: imagePath,
        };
        localStorage.setItem("selectedPet", JSON.stringify(editedPet));
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("breed", breed);
        formData.append("foodAllergies", foodAllergies);
        formData.append("congenitalDisease", congenitalDisease);
        if (image) formData.append("image", image);
        try {
            const response = await axiosPrivate.put(
                `/pet/${pet?._id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(response);
            navigate("/profile", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageClick = () => {
        hiddenImageInputRef.current?.click();
    };

    return (
        <form className="addPetForm" onSubmit={(e) => handleSubmit(e)}>
            <div className="addPetFormContainer">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    placeholder="name"
                    autoComplete="off"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="type">Type</label>
                <input
                    id="type"
                    placeholder="type"
                    autoComplete="off"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="breed">Breed</label>
                <input
                    id="breed"
                    placeholder="breed"
                    autoComplete="off"
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                <label htmlFor="foodAllergies">Food Allergies</label>
                <input
                    id="foodAllergies"
                    placeholder="foodAllergies"
                    autoComplete="off"
                    type="text"
                    value={foodAllergies}
                    onChange={(e) => setFoodAllergies(e.target.value)}
                />
                <label htmlFor="congenitalDisease">Congenital Disease</label>
                <input
                    id="congenitalDisease"
                    placeholder="congenitalDisease"
                    autoComplete="off"
                    type="text"
                    value={congenitalDisease}
                    onChange={(e) => setCongenitalDisease(e.target.value)}
                />
                <label htmlFor="image">Image</label>
                <img
                    src={
                        image
                            ? imagePath
                            : imagePath
                            ? `http://localhost:3500/images/${imagePath}`
                            : addImageLink
                    }
                    alt="test"
                    onClick={handleImageClick}
                    className="petImage"
                />
                <input
                    id="image"
                    type="file"
                    ref={hiddenImageInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default EditPet;
