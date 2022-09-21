import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes() {
    const token = localStorage.getItem('AUTH_TOKEN');

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}
    