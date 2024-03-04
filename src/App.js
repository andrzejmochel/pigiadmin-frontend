import './App.css';

import React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import {AuthProvider} from './api/authentication/AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={
                            <ProtectedRoute
                                element={<Main />}
                            />
                        } />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
