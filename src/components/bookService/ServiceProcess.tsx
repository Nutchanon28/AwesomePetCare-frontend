import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentService } from "../../features/services/servicesSlice";

const ServiceProcess = () => {
    const services = useSelector(selectCurrentService);

    return (
        <div className="serviceProcess">
            <div
                className={
                    services.step === 0 ? "serviceStepSelected" : "serviceStep"
                }
            >
                Service
            </div>
            <FaAngleDoubleRight className="nextArrow" />
            <div
                className={
                    services.step === 1 ? "serviceStepSelected" : "serviceStep"
                }
            >
                Pet
            </div>
            <FaAngleDoubleRight className="nextArrow" />
            <div
                className={
                    services.step === 2 ? "serviceStepSelected" : "serviceStep"
                }
            >
                Date & Time
            </div>
            <FaAngleDoubleRight className="nextArrow" />
            <div
                className={
                    services.step === 3 ? "serviceStepSelected" : "serviceStep"
                }
            >
                Summary
            </div>
        </div>
    );
};

export default ServiceProcess;
