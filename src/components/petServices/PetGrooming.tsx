import React from "react";
import dogGroomingPhoto from "../../images/dog-grooming.jpeg";
import "../../css/petServices/PetGrooming.css";

const PetGrooming = () => {
    return (
        <>
            <div className="petGrooming">
                <img src={dogGroomingPhoto} alt="dog groomming" />
                <div className="petGroomingDescription">
                    <h1>Dog Grooming</h1>
                    <p>
                        Our team of experienced and caring groomers is dedicated
                        to providing top-notch grooming services tailored to
                        your dog's unique needs. From breed-specific cuts to
                        personalized pampering sessions, we ensure your furry
                        family member leaves looking and feeling their absolute
                        best.
                    </p>
                    <p>
                        We use only the finest, pet-friendly grooming products
                        to ensure the health and well-being of your dog's coat
                        and skin. Our products are carefully selected for their
                        effectiveness and safety, leaving your pooch with a
                        shiny, luscious coat and a delightful fragrance.
                    </p>
                    <p>
                        Your dog is not just a client; they're part of our
                        extended family. We take the time to understand their
                        individual preferences and quirks, ensuring a
                        stress-free and enjoyable grooming experience every time
                        they visit Pampered Paws Paradise.
                    </p>
                    <button>Book</button>
                </div>
            </div>
            <div className="petGroomingPricing">
                <h2>Pricing</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Weight Range</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0-14 lbs</td>
                            <td>$25</td>
                        </tr>
                        <tr>
                            <td>15-25 lbs</td>
                            <td>$30</td>
                        </tr>
                        <tr>
                            <td>25-35 lbs</td>
                            <td>$35</td>
                        </tr>
                        <tr>
                            <td>35-50 lbs</td>
                            <td>$40</td>
                        </tr>
                        <tr>
                            <td>50-60 lbs</td>
                            <td>$45</td>
                        </tr>
                        <tr>
                            <td>60-70 lbs</td>
                            <td>$50</td>
                        </tr>
                        <tr>
                            <td>70-80 lbs</td>
                            <td>$55</td>
                        </tr>
                        <tr>
                            <td>80-90 lbs</td>
                            <td>$65</td>
                        </tr>
                        <tr>
                            <td>95 lbs and up</td>
                            <td>$70+</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PetGrooming;
