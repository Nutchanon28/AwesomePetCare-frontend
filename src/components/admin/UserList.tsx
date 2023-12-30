import React from "react";
import { useGetAllUserQuery } from "../../features/admin/adminApiSlice";
import "../../css/ticket/TicketTable.css";

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
                    {data.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{JSON.stringify(user.roles)}</td>
                                <td>{user.name}</td>
                                <td>
                                    {user.pets
                                        .reduce(
                                            (prev, pet) =>
                                                prev + `${pet.name}, `,
                                            ""
                                        )
                                        .slice(0, -2)}
                                </td>
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
