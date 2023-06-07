import React from "react";

const Pet = () => {
    return (
        <li className="pet">
            <img
                src="https://img.youtube.com/vi/5530I_pYjbo/mqdefault.jpg"
                alt="pet"
            />
            <div>
                <h4>Kohaku</h4>
                <p>Cat {"(Maine Coon)"}</p>
            </div>
        </li>
    );
};

export default Pet;
