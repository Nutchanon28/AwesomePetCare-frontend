import React from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../../features/services/servicesSlice";

const ServiceBtn = () => {
    const dispatch = useDispatch();
    return (
        <div className="serviceBtn">
            <button onClick={() => dispatch(setStep({ mode: "back" }))}>
                back
            </button>
            <button onClick={() => dispatch(setStep({ mode: "next" }))}>
                next
            </button>
        </div>
    );
};

export default ServiceBtn;
