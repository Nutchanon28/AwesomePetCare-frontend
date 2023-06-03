import React, { useState } from "react";
import "../../css/profile/Profile.css";

const Profile = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    return (
        <>
            <div className="profile">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCL2oUzmENq2Uq4aakeX-IODtfyH2VOU6R4A&usqp=CAU"
                    alt="avatar"
                />
                <div className="userInfo">
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
                </div>
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
