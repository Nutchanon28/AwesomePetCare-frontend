import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {
    selectCurrentRoles,
    selectCurrentToken,
} from "../features/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
    const roles = useSelector(selectCurrentRoles);
    const accessToken = useSelector(selectCurrentToken);
    const location = useLocation();

    return roles?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : accessToken ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
