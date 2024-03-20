import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './api/authentication/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth();
    return (
        <Route {...rest}
            render={(props) => {
                return isAuthenticated() ? (
                    children
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                );
            }}
        />
    );
};

export default ProtectedRoute;