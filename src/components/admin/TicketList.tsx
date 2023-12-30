import React from "react";
import "../../css/ticket/TicketTable.css";
import { useGetAllTicketQuery } from "../../features/admin/adminApiSlice";

const TicketList = () => {
    const { data, isLoading, isError, error, isSuccess } =
        useGetAllTicketQuery(null);

    console.log(data);
    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <table>
                <thead>
                    <tr>
                        <th>date</th>
                        <th>service</th>
                        <th>user</th>
                        <th>pets</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ticket) => {
                        return (
                            <tr key={ticket._id}>
                                <td>
                                    {new Date(
                                        ticket.datetime
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                        ticket.datetime
                                    ).toLocaleTimeString()}
                                </td>
                                <td>{ticket.service}</td>
                                <td>{ticket.userId.name}</td>
                                <td>
                                    {ticket.petsId
                                        .reduce(
                                            (prev, pet) =>
                                                prev + `${pet.name}, `,
                                            ""
                                        )
                                        .slice(0, -2)}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button className="cancelBtn">
                                        cancel
                                    </button>
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

export default TicketList;
