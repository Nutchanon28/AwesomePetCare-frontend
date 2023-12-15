import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import EditPet from "./components/addPet/EditPet";
import BookService from "./components/bookService/BookService";
import AddPetTest from "./components/addPet/AddPetTest";
import Logout from "./components/Logout";
import ImageCrop from "./components/imageCrop/ImageCrop";
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
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Home />} />

                <Route element={<PersistLogin />}>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="/add_pet" element={<AddPetTest />} />
                    </Route>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="/edit_pet" element={<EditPet />} />
                    </Route>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="/logout" element={<Logout />} />
                    </Route>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="/book_service" element={<BookService />} />
                    </Route>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route
                            path="/crop_photo"
                            element={
                                <ImageCrop src="https://www.digitalmomblog.com/wp-content/uploads/2020/10/among-us-meme-sus.jpeg" />
                            }
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
