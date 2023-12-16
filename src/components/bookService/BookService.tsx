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

const BookService = () => {
    const params = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const services = useSelector(selectCurrentService);
    const dispatch = useDispatch();

    return (
        <div className="bookService">
            <h1>Dog Grooming</h1>
            <div className="serviceProcess">
                <div className="serviceStep">Service</div>
                <FaAngleDoubleRight className="nextArrow" />
                <div className="serviceStep">Pet</div>
                <FaAngleDoubleRight className="nextArrow" />
                <div className="serviceStep">Date & Time</div>
                <FaAngleDoubleRight className="nextArrow" />
                <div className="serviceStep">Summary</div>
            </div>
            <p>Costs: 69$</p>
            <p>Select Service</p>
            <div className="selectService">
                <div className="serviceCard">
                    <h2>Basic Service</h2>
                    <ul>
                        <li>a bath</li>
                        <li>trimmed nails</li>
                        <li>cleaned ears</li>
                    </ul>
                </div>
                <div className="serviceCard">
                    <h2>Full Service</h2>
                    <ul>
                        <li>a bath with towel and hair drying</li>
                        <li>teeth brushing</li>
                        <li>nail trimming</li>
                        <li>eye and ear cleaning</li>
                        <li>a brush out</li>
                        <li>
                            a haircut based upon your dog&#39;s breed standard
                            or your individual style choice
                        </li>
                    </ul>
                </div>
            </div>
            <div className="serviceBtn">
                <button onClick={() => dispatch(setStep({ mode: "back" }))}>
                    back
                </button>
                <button onClick={() => dispatch(setStep({ mode: "next" }))}>
                    next
                </button>
            </div>
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
