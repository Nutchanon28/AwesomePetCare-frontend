import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const BookService = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date || new Date())}
                showTimeSelect
                dateFormat="Pp"
            />
        </div>
    );
};

export default BookService;

/*
I'm currently making 
*/