import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './api/authentication/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;