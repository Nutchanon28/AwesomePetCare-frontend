import React from "react";
import { useSelector } from "react-redux";
import {
    selectCurrentPrice,
    selectCurrentService,
} from "../../features/services/servicesSlice";

const Summary = () => {
    const services = useSelector(selectCurrentService);
    const price = useSelector(selectCurrentPrice);

    const costsList = (
        <>
            <div className="feeAndCost">
                <p style={{ fontWeight: "bold" }}>Fees</p>
                <p style={{ fontWeight: "bold" }}>Costs</p>
            </div>
            <div className="feeAndCost">
                <p>Service Tier ({services.tier}) :</p>
                <p>{services.price.tier}</p>
            </div>
            {services.pets.map((pet) => {
                return (
                    <div key={pet._id} className="feeAndCost">
                        <p>{pet.name} : </p>
                        <p>{services.price[pet._id]}</p>
                    </div>
                );
            })}
            <div className="feeSeperationLine"></div>
            <div className="feeAndCost">
                <p style={{ fontWeight: "bold" }}>Total : </p>
                <p style={{ fontWeight: "bold" }}>{price}</p>
            </div>
        </>
    );

    return (
        <div>
            <h2>Summary</h2>
            <p>
                Appointment for dog grooming booked at{" "}
                {services.time?.toLocaleDateString()}{" "}
                {services.time?.toLocaleTimeString()}
            </p>
            {costsList}
            <div className="confirmBtnContainer">
                <button>Confirm Payment</button>
            </div>
        </div>
    );
};

export default Summary;
