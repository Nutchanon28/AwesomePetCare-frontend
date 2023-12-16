import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
// import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, logOut } from "../features/auth/authSlice";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    // const { auth, persist } = useAuth();
    const accessToken = useSelector(selectCurrentToken);
    const dispatch = useDispatch()

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
                dispatch(logOut());
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !accessToken
            ? verifyRefreshToken()
            : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(accessToken)}`);
    }, [isLoading]);

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    );
};

export default PersistLogin;
