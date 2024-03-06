// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from "axios";
import {API_URL} from '../../Env'
import tokenCookie from './TokenCookie'
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const getUser = (token) => {
        const payload = jwtDecode(token);
        return payload.sub;
    };


    const login = (loginName, password) => {
        console.log(`${API_URL}/signin`)
        return axios.post(`${API_URL}/signin`, { loginName, password }).then(result => {
            const token = result.data.authorization
            tokenCookie.setToken(token);
            setUser(getUser(token))
            return true;
        });
    };

    const isAuthenticated = () => {
        return tokenCookie.isToken();
    }


    const logout = () => {
        setUser(null)
        tokenCookie.cleanToken();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};