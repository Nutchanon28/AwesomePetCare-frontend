import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type tileDisabledInput = {
    activeStartDate: Date;
    date: Date;
    view: string;
};

const tileDisabled = ({ activeStartDate, date, view }: tileDisabledInput) =>
    date.getDay() === 1;

const BookService = () => {
    const [value, onChange] = useState<Value>(new Date());

    console.log(value);

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={value}
                tileDisabled={tileDisabled}
            />
            <input type="file" accept="image/*" onChange={() => console.log("changed")}/>
        </div>
    );
};

export default BookService;
