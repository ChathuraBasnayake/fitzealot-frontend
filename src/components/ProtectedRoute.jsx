import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('jwtToken');
            return <Navigate to="/login" replace />;
        }

        // Return Outlet for nested routes or children if provided
        return children ? children : <Outlet />;
    } catch (err) {
        localStorage.removeItem('jwtToken');
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;