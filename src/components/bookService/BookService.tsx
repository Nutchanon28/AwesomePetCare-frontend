import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/bookService/bookService.css";
import { useParams } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentService,
    setStep,
} from "../../features/services/servicesSlice";
import ServiceProcess from "./ServiceProcess";
import ServiceBtn from "./ServiceBtn";
import PetGroomingService from "./petGrooming/PetGroomingService";

const BookService = () => {
    const params = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const services = useSelector(selectCurrentService);
    const dispatch = useDispatch();
    console.log(services);

    return (
        <div className="bookService">
            <h1>Dog Grooming</h1>
            <ServiceProcess />
            <p>Costs: {services.price}$</p>
            {/* <Outlet /> */}
            <PetGroomingService />
            <ServiceBtn />
            {/* <p>Select your pet(s):</p>
            <ul>
                <li>pet1</li>
            </ul>
            <p>Pick date and time:</p>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date || new Date())}
                showTimeSelect
                dateFormat="Pp"
            /> */}
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
