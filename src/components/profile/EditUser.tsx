import React, { useState } from "react";
import {
    useEditUserMutation,
    useGetUserQuery,
} from "../../features/user/userApiSlice";

const EditUser = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [editUser] = useEditUserMutation();
    const { data: userData } = useGetUserQuery(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await editUser(name).unwrap();
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
                placeholder={userData.user.name ?? "name"}
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
                placeholder={userData.user.username ?? "username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">save</button>
        </form>
    );
};

export default EditUser;
