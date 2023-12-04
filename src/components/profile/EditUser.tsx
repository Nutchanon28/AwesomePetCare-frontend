import React, { useContext } from "react";
import { UserContext } from "../../context/UserProfileContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditUser = () => {
    const {
        state: { name, username },
        setName,
        setUsername,
    } = useContext(UserContext);
    const axiosPrivate = useAxiosPrivate();

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
    );
};

export default EditUser;
