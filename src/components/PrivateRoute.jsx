import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 

const PrivateRoute = ({ children }) => {
    let auth = useAuth();

    return (
        auth ? children : <Navigate to="/" />
    )
}

export default PrivateRoute;