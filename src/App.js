import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import AddPet from "./components/addPet/AddPet";
import AddPetTest from "./components/addPet/AddPetTest";
import Logout from "./components/Logout";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import "./css/Global.css";

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
                    <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                        <Route path="/add_pet" element={<AddPetTest />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                        <Route path="/logout" element={<Logout />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
