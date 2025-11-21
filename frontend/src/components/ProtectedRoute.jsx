import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem('user_token');

    if (!token) {

        return <Navigate to="/admin" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userType = decodedToken.tipo;

        if (allowedRoles && allowedRoles.includes(userType)) {

            return <Outlet />;
        } else {

            return <Navigate to="/" replace />;
        }
    } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem('user_token');
        return <Navigate to="/admin" replace />;
    }
}

