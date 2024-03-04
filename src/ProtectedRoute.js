import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './api/authentication/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useAuth();
    // let  authenticated = isAuthenticated()
    return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;