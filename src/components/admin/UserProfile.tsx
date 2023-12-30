import React, { useState } from "react";
import { useGetUserByUsernameQuery } from "../../features/admin/adminApiSlice";
import { useParams } from "react-router-dom";
// import PetDetail from "../profile/PetDetail";
import PetList from "../profile/PetList";
import userDefaultAvatar from "../../images/user.png";
import "../../css/profile/Profile.css";

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

const UserProfile = () => {
    const { username } = useParams();
    const {
        data: user,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useGetUserByUsernameQuery(username ?? "");
    const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
    // console.log("UserProfile data = ", data);

    let profile;
    if (isLoading) {
        profile = <p>Loading...</p>;
    } else if (isSuccess) {
        const avatarPath = user?.avatarFileKey
            ? `http://localhost:3500/images/${user?.avatarFileKey}`
            : userDefaultAvatar;

        profile = (
            <div className="profileCard">
                <div className="avatarForm">
                    <img
                        src={avatarPath}
                        alt="avatar"
                        className="avatar"
                        style={{ cursor: "default" }}
                    />
                </div>
                <div className="userInfo">
                    <h2>{user.name ?? ""}</h2>
                    <p>{user.username ?? ""}</p>
                </div>
            </div>
        );
    } else if (isError) {
        console.log(error);
    }

    return (
        <>
            <div className="profile">{profile}</div>
            <div className="profileSeperationLine"></div>
            <div className="petSection">
                <PetList pets={user?.pets} setSelectedPet={setSelectedPet} />
                <div className="petDetail">
                    {selectedPet != null ? (
                        <>
                            <div className="petHeader">
                                <img
                                    src={`http://localhost:3500/images/${selectedPet.image}`}
                                    alt={selectedPet.name}
                                />
                                <div className="petName">
                                    <h3>{selectedPet.name}</h3>
                                    <p>{`${selectedPet.type} (${selectedPet.breed})`}</p>
                                </div>
                            </div>
                            <p style={{ fontWeight: "bold" }}>Food Allergies</p>
                            <p>{selectedPet.foodAllergies}</p>
                            <p style={{ fontWeight: "bold" }}>
                                Congenital Disease
                            </p>
                            <p>{selectedPet.congenitalDisease}</p>
                            <p style={{ fontWeight: "bold" }}>Description</p>
                            <p>{selectedPet.description ?? "-"}</p>
                        </>
                    ) : (
                        <p>No pet selected</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserProfile;
