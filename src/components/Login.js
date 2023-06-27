import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/Login.css";

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrorMessage(null);
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/login",
                {
                    username,
                    password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(response);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ username, password, roles, accessToken }); // TODO: why are you storing password in auth?
            setUsername("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("No Server Response");
            } else if (error.response?.status === 400) {
                setErrorMessage("Missing Username or Password");
            } else if (error.response?.status === 401) {
                setErrorMessage("Unauthorized");
            } else {
                setErrorMessage("Login Failed");
            }
            errorRef.current?.focus();
        }
    };

    const togglePersist = () => {
        setPersist((prev) => !prev);
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    return (
        <section className="loginSection">
            {errorMessage !== null && (
                <p ref={errorRef} aria-live="assertive">
                    {errorMessage}
                </p>
            )}
            <h1>Sign In</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input
                    required
                    id="username"
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">password</label>
                <input
                    required
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
                <div className="persistChecker">
                    <input
                        className="persistCheckbox"
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
        </section>
    );
};

export default Login;
