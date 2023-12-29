import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/profile/Profile.css";
import EditUser from "./EditUser";
import { FaEdit } from "react-icons/fa";
import PetList from "./PetList";
import PetDetail from "./PetDetail";
import Popup from "../imageCrop/ImageCropPopup";
import userDefaultAvatar from "../../images/user.png";
import {
    useEditUserAvatarMutation,
    useGetUserQuery,
} from "../../features/user/userApiSlice";

// interface User {
//     _id: string;
//     username: string;
//     roles: Role[];
//     name?: string;
//     pets: IPet[];
//     avatarFileKey?: string;
// }

// interface Role {
//     User: 2001;
//     Admin?: 5150;
// }
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

// TODO: If the accessToken expires, and the user return to this page. The components will be broken?
const Profile = () => {
    const {
        data: user,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useGetUserQuery(null);
    const [editUserAvatar] = useEditUserAvatarMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
    const [newAvatarPath, setNewAvatarPath] = useState("");
    const hiddenImageInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const effectRan = useRef(false);

    useEffect(() => {
        if (selectedPet)
            localStorage.setItem("selectedPet", JSON.stringify(selectedPet));
    }, [selectedPet]);

    const postAvatar = async (blob: Blob) => {
        const formData = new FormData();
        if (blob) formData.append("avatar", blob);
        console.log("--------Blob is this--------");
        console.log(blob);
        try {
            const response = await editUserAvatar(formData).unwrap();
            console.log(response);
            setIsPopupOpen(false);

            const avatarInput = document.getElementById(
                "avatar"
            ) as HTMLInputElement;
            avatarInput.value = "";
        } catch (error) {
            console.log(error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("img onChange triggered");
        setIsPopupOpen(true);
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setNewAvatarPath(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        hiddenImageInputRef.current?.click();
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        const avatarInput = document.getElementById(
            "avatar"
        ) as HTMLInputElement;
        avatarInput.value = "";
    };

    let profile;
    if (isLoading) {
        profile = <p>Loading...</p>;
    } else if (isSuccess) {
        const avatarPath = user?.avatarFileKey
            ? `http://localhost:3500/images/${user?.avatarFileKey}`
            : userDefaultAvatar;
        console.log(user);

        profile = (
            <div className="profileCard">
                <form className="avatarForm">
                    <img
                        src={avatarPath}
                        alt="avatar"
                        className="avatar"
                        onClick={handleImageClick}
                    />
                    <label htmlFor="avatar" style={{ display: "none" }}>
                        avatar
                    </label>
                    <input
                        required
                        ref={hiddenImageInputRef}
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: "none" }}
                    />
                </form>
                {isEditing ? (
                    <EditUser />
                ) : (
                    <div className="userInfo">
                        <h2>{user.name ?? ""}</h2>
                        <p>{user.username ?? ""}</p>
                    </div>
                )}
                <FaEdit
                    style={isEditing ? { color: "#004ABB" } : { color: "#333" }}
                    className="profileIcon"
                    onClick={() => setIsEditing(!isEditing)}
                />
            </div>
        );
    } else if (isError) {
        console.log(error);
        if (effectRan.current || process.env.NODE_ENV !== "development") {
            navigate("/login", {
                state: { from: location },
                replace: true,
            });
        }
    }
    console.log("profile is ", profile);

    return (
        <>
            <div className="profile">{profile}</div>
            <div className="profileSeperationLine"></div>
            <div className="petSection">
                <PetList setSelectedPet={setSelectedPet} />
                <PetDetail pet={selectedPet} />
            </div>
            {isPopupOpen && (
                <Popup
                    onClose={handlePopupClose}
                    onSubmit={postAvatar}
                    imgSrc={newAvatarPath}
                />
            )}
        </>
    );
};

export default Profile;

// Icons needed attribution
/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a> */
