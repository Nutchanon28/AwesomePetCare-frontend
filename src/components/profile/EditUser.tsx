import React, { useContext } from "react";
import { UserContext } from "../../context/UserProfileContext";

interface EditUserProps {
    // name: string,
    // setName: React.Dispatch<React.SetStateAction<string>>,
    // username: string,
    // setUsername: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const EditUser = ({ handleSubmit }: EditUserProps) => {
    const {
        state: { name, username },
        setName,
        setUsername,
    } = useContext(UserContext);

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
