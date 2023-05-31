import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header>AwesomePetCare</header>
            <main className="App">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
