import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import "../css/Login.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrorMessage(null);
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password }).unwrap();
            console.log(response);
            dispatch(setCredentials({ ...response, user: username }));

            setUsername("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.originalStatus) {
                setErrorMessage("No Server Response");
            } else if (error.originalStatus === 400) {
                setErrorMessage("Missing Username or Password");
            } else if (error.originalStatus === 401) {
                setErrorMessage("Unauthorized");
            } else {
                setErrorMessage("Login Failed");
            }
            errorRef.current?.focus();
        }
    };

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
                <Link to="/register">Sign Up</Link>
            </form>
        </section>
    );
};

export default Login;
