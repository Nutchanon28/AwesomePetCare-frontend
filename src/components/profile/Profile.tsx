import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../css/profile/Profile.css";
import EditUser from "./EditUser";
import { FaEdit } from "react-icons/fa";
import PetList from "./PetList";
import PetDetail from "./PetDetail";
import Popup from "../imageCrop/ImageCropPopup";
import userDefaultAvatar from "../../images/user.png";

interface IPet {
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
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarPath, setAvatarPath] = useState("");
    const [pets, setPets] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [isChangingAvatar, setIsChangingAvatar] = useState(false);
    const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
    const [newAvatarPath, setNewAvatarPath] = useState("");
    const hiddenImageInputRef = useRef<HTMLInputElement>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRan = useRef(false);

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
                console.log(response.data);
                console.log(petResponse.data);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.put("/profile", {
                name,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

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
            setIsChangingAvatar(false);
            setIsPopupOpen(false);
            setAvatarPath(URL.createObjectURL(blob));
        } catch (error) {
            console.log(error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPopupOpen(true);
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            setIsChangingAvatar(true);

            reader.onload = () => {
                setNewAvatarPath(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        hiddenImageInputRef.current?.click();
    };

    return (
        <>
            <div className="profile">
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
                    {/* {isChangingAvatar && <button type="submit">save</button>} */}
                </form>
                {isEditing ? (
                    <EditUser
                        name={name}
                        setName={setName}
                        username={username}
                        setUsername={setUsername}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <div className="userInfo">
                        <h2>{name}</h2>
                        <p>{username}</p>
                    </div>
                )}
                <FaEdit
                    style={isEditing ? { color: "#004ABB" } : { color: "#333" }}
                    className="profileIcon"
                    onClick={() => setIsEditing(!isEditing)}
                />
            </div>
            <div className="profileSeperationLine"></div>
            <div className="petSection">
                <PetList pets={pets} setSelectedPet={setSelectedPet} />
                <PetDetail pet={selectedPet} />
            </div>
            {isPopupOpen && (
                <Popup
                    onClose={() => setIsPopupOpen(false)}
                    onSubmit={postAvatar}
                    imgSrc={newAvatarPath}
                />
            )}
        </>
    );
};

export default Profile;

// Icons needed attribution
{/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Smashicons - Flaticon</a> */}

