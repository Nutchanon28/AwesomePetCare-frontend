import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
    User: 2001,
    Admin: 5150,
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login />} />

                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
