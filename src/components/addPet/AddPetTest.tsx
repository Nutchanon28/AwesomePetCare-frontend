import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../../css/addPet/AddPet.css";

interface IPetInput {
    name: string;
    type: string;
    breed: string;
    foodAllergies: string;
    congenitalDisease: string;
}

const AddPetTest = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IPetInput>();
    const onSubmit: SubmitHandler<IPetInput> = (data) => console.log(data);

    console.log(watch("name"));

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
                <p className="characterCounter" style={{ color: (watch("name")?.length ?? 0 ) > 10 ? "#FF0000" : "#000"}}>{watch("name")?.length ?? 0}/10</p>

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
