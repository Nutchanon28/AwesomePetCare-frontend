import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
    User: 2001,
    Admin: 5150,
};

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Login />} />

                <Route element={<PersistLogin />}>

                </Route>
            </Route>
        </Routes>
    );
}

export default App;
