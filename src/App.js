import './App.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import {AuthProvider} from './api/authentication/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Router from "react-router-dom/es/Router";
import history from "./api/history/history";
import ChangePasswordPaths from "./paths/ChangePasswordPaths";

function App() {

    return (
        <AuthProvider>
            <Router history={history}>
                <div className="App">
                    <Switch>
                        <Route path="/login" children={<Login/>}/>
                        <Route path="/changepassword" children={<ChangePasswordPaths />} />
                        <ProtectedRoute path="/*" children={<Main />}/>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
