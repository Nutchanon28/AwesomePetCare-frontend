import React from "react";
import "../../css/navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreenSize";

const Navbar = () => {
    const screenSize = useScreenSize();

    return (
        <>
            {screenSize.width > 300 ? (
                <ul className="navbar">
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/login">login</Link>
                    </li>
                    <li>
                        <Link to="/profile">profile</Link>
                    </li>
                    <li>
                        <Link to="/logout">logout</Link>
                    </li>
                </ul>
            ) : (
                <div className="dropdown">
                    <button className="dropbtn">
                        <FaBars />
                    </button>
                    <div className="dropdown-content">
                        <Link to="/">home</Link>
                        <Link to="/login">login</Link>
                        <Link to="/profile">profile</Link>
                        <Link to="/logout">logout</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
