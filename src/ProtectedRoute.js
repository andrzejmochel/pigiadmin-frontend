import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './api/authentication/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route {...rest}
            render={() => {
                return user ? (
                    children
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
};

export default ProtectedRoute;