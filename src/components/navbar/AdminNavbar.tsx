import React from "react";
import "../../css/navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreenSize";
import { useLogOutMutation } from "../../features/auth/authApiSlice";
import { logOut as clearCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const AdminNavbar = () => {
    const screenSize = useScreenSize();
    const dispatch = useDispatch();
    const [logOut] = useLogOutMutation();

    const handleLogout = async () => {
        const response = await logOut(null).unwrap();
        console.log(response);
        dispatch(clearCredentials());
    };

    return (
        <>
            {screenSize.width > 300 ? (
                <ul className="navbar">
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={handleLogout}>
                            logout
                        </Link>
                    </li>
                </ul>
            ) : (
                <div className="dropdown">
                    <button className="dropbtn">
                        <FaBars />
                    </button>
                    <div className="dropdown-content">
                        <Link to="/">home</Link>
                        <Link to="/login" onClick={handleLogout}>
                            logout
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminNavbar;
