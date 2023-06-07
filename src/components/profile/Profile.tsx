import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../css/profile/Profile.css";
import EditUser from "./EditUser";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarPath, setAvatarPath] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState<File | null>(null);

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
                console.log(response.data);
                isMounted && setUsername(response?.data?.user?.username ?? "");
                isMounted && setName(response?.data?.user?.name ?? "");
                isMounted &&
                    setAvatarPath(
                        response?.data?.user?.avatarFileKey
                            ? `http://localhost:3500/images/${response?.data?.user?.avatarFileKey}`
                            : ""
                    );
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

    const handleAvatarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(avatar);

        const formData = new FormData();
        if (avatar) formData.append("avatar", avatar);
        try {
            const response = await axiosPrivate.put(
                "/profile/avatar",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setAvatar(e.target.files[0]);
        }
    };

    return (
        <>
            <div className="profile">
                <img src={avatarPath} alt="avatar" />
                <form onSubmit={handleAvatarSubmit}>
                    <label htmlFor="avatar">avatar</label>
                    <input
                        required
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                    <button type="submit">save</button>
                </form>
                {!isEditing && (
                    <div className="userInfo">
                        <h2>{name}</h2>
                        <p>{username}</p>
                    </div>
                )}
                {isEditing && (
                    <EditUser
                        name={name}
                        setName={setName}
                        username={username}
                        setUsername={setUsername}
                        handleSubmit={handleSubmit}
                    />
                )}
                <FaEdit
                    style={isEditing ? { color: "#004ABB" } : { color: "#333" }}
                    className="profileIcon"
                    onClick={() => setIsEditing(!isEditing)}
                />
            </div>
            <ul>
                <li>Pet#1</li>
                <li>Pet#2</li>
                <li>Pet#3</li>
            </ul>
        </>
    );
};

export default Profile;
