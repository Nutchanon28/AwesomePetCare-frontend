import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/bookService/bookService.css";
import { useSelector } from "react-redux";
import {
    selectCurrentService,
} from "../../features/services/servicesSlice";
import ServiceProcess from "./ServiceProcess";
import ServiceBtn from "./ServiceBtn";
import PetGroomingService from "./petGrooming/PetGroomingService";
import SelectPetList from "./SelectPetList";
import SelectDatetime from "./SelectDatetime";

const BookService = () => {
    const services = useSelector(selectCurrentService);
    console.log(services);

    let mainContent;

    switch (services.step) {
        case 0:
            mainContent = <PetGroomingService />;
            break;
        case 1:
            mainContent = <SelectPetList />;
            break;
        case 2:
            mainContent = <SelectDatetime />;
            break;
        case 3:
            mainContent = <SelectPetList />;
            break;
    }

    return (
        <div className="bookService">
            <h1>Dog Grooming</h1>
            <ServiceProcess />
            <p>Costs: {services.price}$</p>
            {/* <Outlet /> */}
            {mainContent}
            <ServiceBtn />
            {/* <p>Costs:</p> */}
            {/* for each pet */}
            {/* <ul>
                <li>Dogname</li>
                <li>Full Service (weight): 10$</li>
            </ul> */}
        </div>
    );
};

export default BookService;

/*
I'm currently making 
*/
