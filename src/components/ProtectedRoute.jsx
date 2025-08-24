import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('jwtToken');
      return <Navigate to="/login" replace />;
    }

   
    return children;
  } catch (err) {
    localStorage.removeItem('jwtToken');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
