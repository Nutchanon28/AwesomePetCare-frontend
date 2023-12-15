import React from "react";
import "../../css/navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreenSize";
import { useLogOutMutation } from "../../features/auth/authApiSlice";
import {
    logOut as clearCredentials,
    selectCurrentToken,
} from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

/* TODO: hamburger in the middle */
const Navbar = () => {
    const screenSize = useScreenSize();
    const dispatch = useDispatch();
    const [logOut] = useLogOutMutation();
    const accessToken = useSelector(selectCurrentToken);

    const handleLogout = async () => {
        const response = await logOut(null).unwrap();
        console.log(response);
        dispatch(clearCredentials());
    };

    return (
        <>
            {screenSize.width > 300 ? (
                <ul className="navbar">
                    {!accessToken && (
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    {accessToken && (
                        <>
                            <li>
                                <Link to="/profile">profile</Link>
                            </li>
                            <li>
                                <div className="dropdown">
                                    <button className="dropbtn">
                                        services
                                    </button>
                                    <div className="dropdown-content">
                                        <Link to="/">dog grooming</Link>
                                        <Link to="/">pet sitting</Link>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/login" onClick={handleLogout}>
                                    logout
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            ) : (
                <div className="dropdown">
                    <button className="dropbtn">
                        <FaBars />
                    </button>
                    <div className="dropdown-content">
                        {!accessToken && <Link to="/login">login</Link>}
                        <Link to="/">home</Link>
                        {accessToken && (
                            <>
                                <Link to="/profile">profile</Link>
                                <Link to="/book_service">services</Link>
                                <Link to="/login" onClick={handleLogout}>
                                    logout
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
