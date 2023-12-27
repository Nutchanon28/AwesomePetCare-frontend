import React from "react";
import { useGetTicketsQuery } from "../../features/ticket/ticketApiSlice";
import "../../css/ticket/TicketTable.css";

interface ITicket {
    _id: string;
    userId: string;
    petsId: Pet[];
    service: string;
    datetime: Date;
    price: number;
    status: string;
}

interface Pet {
    _id: string;
    ownerId: string;
    name: string;
    type: string;
    breed: string;
    foodAllergies: string;
    congenitalDisease: string;
    image: string;
    description?: string;
}

const TicketTable = () => {
    const { data, isLoading, isError, error, isSuccess } =
        useGetTicketsQuery(null);

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
                        <th>pets</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ticket: ITicket) => {
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

export default TicketTable;