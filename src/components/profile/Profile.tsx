import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../css/profile/Profile.css";
import EditUser from "./EditUser";
import { FaEdit } from "react-icons/fa";
import PetList from "./PetList";
import PetDetail from "./PetDetail";
import Popup from "../imageCrop/ImageCropPopup";
import userDefaultAvatar from "../../images/user.png";
import { UserContext } from "../../context/UserProfileContext";

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

const Profile = () => {
    const {
        state: { name, username, avatarPath },
        setName,
        setUsername,
        setAvatarPath,
    } = useContext(UserContext);

    const [pets, setPets] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
    const [newAvatarPath, setNewAvatarPath] = useState("");
    const hiddenImageInputRef = useRef<HTMLInputElement>(null);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRan = useRef(false);

    useEffect(() => {
        if (selectedPet)
            localStorage.setItem("selectedPet", JSON.stringify(selectedPet));
    }, [selectedPet]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProfile = async () => {
            try {
                const response = await axiosPrivate.get("/profile", {
                    signal: controller.signal,
                });
                const petResponse = await axiosPrivate.get("/pet", {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setUsername(response?.data?.user?.username ?? "");
                    setName(response?.data?.user?.name ?? "");

                    setAvatarPath(
                        response?.data?.user?.avatarFileKey
                            ? `http://localhost:3500/images/${response?.data?.user?.avatarFileKey}`
                            : ""
                    );
                    setPets(petResponse?.data ?? []);
                }
            } catch (error) {
                console.log(error);
                if (
                    effectRan.current ||
                    process.env.NODE_ENV !== "development"
                ) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
            }
        };

        getProfile();

        return () => {
            console.log("Aborted");
            isMounted = false;
            controller.abort();
            setUsername("");
            setName("");
            setAvatarPath("");
        };
    }, []);

    const postAvatar = async (blob: Blob) => {
        const formData = new FormData();
        if (blob) formData.append("avatar", blob);
        console.log("--------Blob is this--------");
        console.log(blob);
        try {
            const response = await axiosPrivate.put(
                "/profile/avatar",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log(response);
            setIsPopupOpen(false);
            setAvatarPath(URL.createObjectURL(blob));
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

    return (
        <>
            <div className="profile">
                <div className="profileCard">
                    <form className="avatarForm">
                        <img
                            src={avatarPath || userDefaultAvatar}
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
                            <h2>{name}</h2>
                            <p>{username}</p>
                        </div>
                    )}
                    <FaEdit
                        style={
                            isEditing ? { color: "#004ABB" } : { color: "#333" }
                        }
                        className="profileIcon"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </div>
            </div>
            <div className="profileSeperationLine"></div>
            <div className="petSection">
                <PetList pets={pets} setSelectedPet={setSelectedPet} />
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
{
    /* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a> */
}
