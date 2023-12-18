import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentService,
    setStep,
} from "../../features/services/servicesSlice";

const ServiceBtn = () => {
    const services = useSelector(selectCurrentService);
    const dispatch = useDispatch();

    const disableNext = () => {
        switch (services.step) {
            case 0:
                return services.tier === null;
            case 1:
                return services.pets.length === 0;
            case 2:
                return services.time === null;
            default:
        }
    };

    return (
        <div className="serviceBtn">
            <button
                onClick={() => dispatch(setStep({ mode: "back" }))}
                disabled={services.step <= 0}
            >
                back
            </button>
            <button
                onClick={() => dispatch(setStep({ mode: "next" }))}
                disabled={disableNext()}
            >
                next
            </button>
        </div>
    );
};

export default ServiceBtn;
