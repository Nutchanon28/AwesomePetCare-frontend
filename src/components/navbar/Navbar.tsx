import React, { useEffect, useState } from "react";
import "../../css/navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreenSize";
import { useLogOutMutation } from "../../features/auth/authApiSlice";
import {
    logOut as clearCredentials,
    selectCurrentToken,
    selectCurrentRoles,
} from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

/* TODO: hamburger in the middle */
const Navbar = () => {
    const screenSize = useScreenSize();
    const dispatch = useDispatch();
    const [logOut] = useLogOutMutation();

    const accessToken = useSelector(selectCurrentToken);
    const roles = useSelector(selectCurrentRoles);
    const [navbarFor, setNavbarFor] = useState("");
    const userInMemory =
        accessToken && roles.includes(2001) && !roles.includes(5150);
    const adminInMemory = accessToken && roles.includes(5150);

    const handleLogout = async () => {
        const response = await logOut(null).unwrap();
        console.log(response);
        dispatch(clearCredentials());
        setNavbarFor("");
    };

    useEffect(() => {
        const getCookie = (key: string) => {
            const cookie = document.cookie.match(
                "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
            );
            return cookie ? cookie.pop() : "";
        };

        setNavbarFor(getCookie("navbar") ?? "");
        console.log(getCookie("navbar"));
    }, []);

    return (
        <>
            {screenSize.width > 300 ? (
                <ul className="navbar">
                    {navbarFor === "" && !accessToken && (
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn">services</button>
                            <div className="dropdown-content">
                                <Link to="/pet_grooming">dog grooming</Link>
                                <Link to="/pet_sitting">pet sitting</Link>
                            </div>
                        </div>
                    </li>
                    {(navbarFor === "2001" || userInMemory) && (
                        <>
                            <li>
                                <Link to="/profile">profile</Link>
                            </li>
                            <li>
                                <Link to="/tickets">tickets</Link>
                            </li>
                        </>
                    )}
                    {(navbarFor === "5150" || adminInMemory) && (
                        <>
                            <li>
                                <Link to="/unauthorized">users</Link>
                            </li>
                        </>
                    )}
                    {(navbarFor !== "" || accessToken) && (
                        <li>
                            <Link to="/login" onClick={handleLogout}>
                                logout
                            </Link>
                        </li>
                    )}
                </ul>
            ) : (
                <div className="dropdown">
                    <button className="dropbtn">
                        <FaBars />
                    </button>
                    <div className="dropdown-content">
                        {navbarFor === "" && !accessToken && (
                            <Link to="/login">login</Link>
                        )}
                        <Link to="/">home</Link>
                        <Link to="/pet_grooming">dog grooming</Link>
                        <Link to="/pet_sitting">pet sitting</Link>
                        {(navbarFor === "2001" || userInMemory) && (
                            <>
                                <Link to="/profile">profile</Link>
                                <Link to="/tickets">tickets</Link>
                                {/* <Link to="/book_service">services</Link> */}
                                <Link to="/login" onClick={handleLogout}>
                                    logout
                                </Link>
                            </>
                        )}
                        {(navbarFor === "5150" || adminInMemory) && (
                            <>
                                <li>
                                    <Link to="/unauthorized">users</Link>
                                </li>
                            </>
                        )}
                        {(navbarFor !== "" || accessToken) && (
                            <Link to="/login" onClick={handleLogout}>
                                logout
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
