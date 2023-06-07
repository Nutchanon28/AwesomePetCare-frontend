import React from "react";
import Pet from "./Pet";
import "../../css/profile/PetList.css";

const PetList = () => {
    return (
        <ul className="petList">
            <Pet />
            <Pet />
        </ul>
    );
};

export default PetList;
