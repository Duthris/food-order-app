import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoutes() {
    const token = localStorage.getItem('AUTH_TOKEN');
    return (
        token ? <Navigate to="/" /> : <Outlet />
    )
}