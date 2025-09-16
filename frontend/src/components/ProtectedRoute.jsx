import { Navigate, Outlet } from 'react-router-dom';


export default function ProtectedRoute() {
    const token = localStorage.getItem('user_token');

    // se não houver token ele redireciona para a página de login do admin
    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    // se houver um token ele permite o acesso
    return <Outlet />;
}
