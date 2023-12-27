import React, { useEffect } from "react";
// TODO: false logout?

const Logout = () => {
    useEffect(() => {
        return () => console.log("Logout Aborted");
    }, []);

    
    return <div>Logout</div>;
};

export default Logout;
