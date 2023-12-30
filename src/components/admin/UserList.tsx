import React from "react";
import { useGetAllUserQuery } from "../../features/admin/adminApiSlice";
import "../../css/ticket/TicketTable.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const { data, isLoading, isError, error, isSuccess } =
        useGetAllUserQuery(null);
    const navigate = useNavigate();

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
                            <tr
                                key={user._id}
                                onClick={() =>
                                    navigate(`/users/${user.username}`)
                                }
                                style={{ cursor: "pointer" }}
                            >
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
