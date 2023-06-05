import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../css/profile/Profile.css";

const Profile = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
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

    return (
        <>
            <div className="profile">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCL2oUzmENq2Uq4aakeX-IODtfyH2VOU6R4A&usqp=CAU"
                    alt="avatar"
                />
                <form className="userForm" onSubmit={handleSubmit}>
                    <label htmlFor="name">name</label>
                    <input
                        required
                        type="text"
                        id="name"
                        autoComplete="off"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="username" className="usernameLabel">
                        username
                    </label>
                    <input
                        required
                        type="text"
                        id="username"
                        autoComplete="off"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">save</button>
                </form>
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
