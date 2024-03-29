import {
    BaseQueryApi,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { StoreState } from "../types/auth";
import { logOut, setCredentials } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as StoreState;
        const token = state.auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {}
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log("sending refresh token");

        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        console.log(refreshResult);
        if (refreshResult?.data) {
            const state = api.getState() as StoreState;
            const user = state.auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Pets", "User", "Tickets"],
    endpoints: (builder) => ({}),
});
