import React, { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        return () => console.log("Logout Aborted");
    }, []);

    
    return <div>Logout</div>;
};

export default Logout;
