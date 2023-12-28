import React from "react";
import { useGetAllUserQuery } from "../../features/admin/adminApiSlice";
import "../../css/ticket/TicketTable.css";

interface User {
    _id: string;
    username: string;
    roles: Role[];
    name?: string;
    // pets: string,
}

interface Role {
    User: 2001;
    Admin?: 5150;
}

const UserList = () => {
    const { data, isLoading, isError, error, isSuccess } =
        useGetAllUserQuery(null);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>role</th>
                        <th>name</th>
                        <th>pets</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user: User) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{JSON.stringify(user.roles)}</td>
                                <td>{user.name}</td>
                                <td>pets' name</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    } else if (isError) {
        console.log(error);
    }
    return <div className="ticketTable">{content}</div>;
};

export default UserList;
