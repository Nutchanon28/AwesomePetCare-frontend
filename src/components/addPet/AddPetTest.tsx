import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../../css/addPet/AddPet.css";
import { useNavigate } from "react-router-dom";
import { useAddPetMutation } from "../../features/pets/petsApiSlice";

interface IPetInput {
    name: string;
    type: string;
    breed: string;
    foodAllergies: string;
    congenitalDisease: string;
}

// TODO: can't add pet when token expire (403 forbidden)
const AddPetTest = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IPetInput>();
    const [addPet] = useAddPetMutation();
    const hiddenImageInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>();
    const [imagePath, setImagePath] = useState("");
    const addImageLink =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png";
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IPetInput> = async (data) => {
        console.log(data);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("breed", data.breed);
        formData.append("foodAllergies", data.foodAllergies);
        formData.append("congenitalDisease", data.congenitalDisease);
        if (image) formData.append("image", image);
        console.log(`image = ${image}`);

        try {
            const response = await addPet(formData).unwrap();
            console.log(response);
            navigate("/profile", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

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

    const handleImageClick = () => {
        hiddenImageInputRef.current?.click();
    };

    return (
        <form className="addPetForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="addPetFormContainer">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    placeholder="name"
                    autoComplete="off"
                    type="text"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", { required: true, maxLength: 10 })}
                />
                <p
                    className="characterCounter"
                    style={{
                        color:
                            (watch("name")?.length ?? 0) > 10
                                ? "#FF0000"
                                : "#000",
                    }}
                >
                    {watch("name")?.length ?? 0}/10
                </p>

                <label htmlFor="type">Type</label>
                <input
                    id="type"
                    placeholder="type"
                    autoComplete="off"
                    type="text"
                    {...register("type", { required: true })}
                />

                <label htmlFor="breed">Breed</label>
                <input
                    id="breed"
                    placeholder="breed"
                    autoComplete="off"
                    type="text"
                    {...register("breed", { required: true })}
                />

                <label htmlFor="foodAllergies">Food Allergies</label>
                <input
                    id="foodAllergies"
                    placeholder="food allergies"
                    autoComplete="off"
                    type="text"
                    {...register("foodAllergies", {
                        required: true,
                        maxLength: 100,
                    })}
                />

                <label htmlFor="congenitalDisease">Congenital Disease</label>
                <input
                    id="congenitalDisease"
                    placeholder="congenital disease"
                    autoComplete="off"
                    type="text"
                    {...register("congenitalDisease", {
                        required: true,
                        maxLength: 100,
                    })}
                />

                <label htmlFor="image">Image</label>
                <img
                    src={image ? imagePath : addImageLink}
                    alt="test"
                    onClick={handleImageClick}
                    className="petImage"
                />
                <input
                    required
                    id="image"
                    type="file"
                    ref={hiddenImageInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />

                <button type="submit">Add</button>

                {errors.name?.type === "required" && (
                    <p role="alert">First name is required</p>
                )}
                {/* {errors.name && (
                    <p role="alert">{errors.name?.message}</p>
                )} */}
            </div>
        </form>
    );
};

export default AddPetTest;
