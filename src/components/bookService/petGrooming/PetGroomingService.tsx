import React from "react";

const PetGroomingService = () => {
    return (
        <>
        {/* Process of this service */}
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
        </>
    );
};

export default PetGroomingService;
