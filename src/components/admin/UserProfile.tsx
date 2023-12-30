import React from "react";
import { useGetUserByUsernameQuery } from "../../features/admin/adminApiSlice";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { username } = useParams();
    const { data, isLoading, isError, error, isSuccess } =
        useGetUserByUsernameQuery(username ?? "");
    console.log("UserProfile data = ", data);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = <div>UserProfile</div>;
    } else if (isError) {
        console.log(error);
    }
    return <>{content}</>;
};

export default UserProfile;
