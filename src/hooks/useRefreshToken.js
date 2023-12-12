import { useDispatch } from "react-redux";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { setCredentials } from "../features/auth/authSlice";

const useRefreshToken = () => {
    // const { setAuth } = useAuth();
    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true,
        });
        dispatch(setCredentials({ ...response.data }));
        // setAuth((prev) => {
        //     // console.log(JSON.stringify(prev));
        //     // console.log(response.data.accessToken);
        //     return {
        //         ...prev,
        //         roles: response.data.roles,
        //         accessToken: response.data.accessToken,
        //     };
        // });
        return response.data.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
