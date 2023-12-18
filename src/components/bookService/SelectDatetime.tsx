import React from "react";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentService,
    setTime,
} from "../../features/services/servicesSlice";

import "react-datepicker/dist/react-datepicker.css";
import { addMonths, getDay, setHours, setMinutes } from "date-fns";

const SelectDatetime = () => {
    const services = useSelector(selectCurrentService);
    const dispatch = useDispatch();
    // const [startDate, setStartDate] = useState<Date | null>(null);
    // console.log(startDate);

    const isNotWorkDay = (date: Date) => {
        const day = getDay(date);
        return day !== 0;
    };

    return (
        <>
            <p>Pick date and time:</p>
            <DatePicker
                placeholderText="Pick a date and time"
                selected={services.time}
                onChange={(date) => dispatch(setTime(date))}
                showIcon
                icon={<FaCalendar />}
                filterDate={isNotWorkDay}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 3)}
                showTimeSelect
                dateFormat="Pp"
                // customTimeInput={<TimeInput />}
                minTime={setHours(
                    setMinutes(services.time || new Date(), 0),
                    8
                )}
                maxTime={setHours(
                    setMinutes(services.time || new Date(), 0),
                    16
                )}
                injectTimes={[
                    setHours(setMinutes(services.time || new Date(), 0), 8),
                    setHours(setMinutes(services.time || new Date(), 0), 10),
                    setHours(setMinutes(services.time || new Date(), 0), 12),
                    setHours(setMinutes(services.time || new Date(), 0), 14),
                ]}
                timeIntervals={2 * 60}
                onKeyDown={(e) => {
                    e.preventDefault();
                }}
            />
            <p>
                Dog grooming services are avaliable Monday to Saturday from
                08:00 to 16:00. You can make appointments in advance with the
                maximum number of three months in advance. The amount of time it
                takes to groom a dog depends on several factors, including the
                breed, the length and type of coat, the dog&#39;s size and the
                level of matting or tangles.
            </p>
            <p>
                If your dog is a short-haired or small breed, has a calm,
                non-anxious temperament and doesn&#39;t need any special
                considerations when grooming, expect your grooming appointment
                to last anywhere between 30 minutes to an hour. If your dog is
                large, has a long, dense coat, has matting, is nervous or
                anxious or you need additional grooming services (like a
                haircut), expect your appointment to take upwards of three
                hours.
            </p>
        </>
    );
};

export default SelectDatetime;
