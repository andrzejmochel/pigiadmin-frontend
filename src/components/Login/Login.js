// components/Login.js
import React, {useState} from 'react';
import './Login.css';
import {useAuth} from '../../api/authentication/AuthContext'
import {useNotification} from "rc-notification";
import history from "../../api/history/history";

const Login = ({onLoginSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const [notification, notificationContext] = useNotification({})

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password).then((success) => {
            history.push("/");
        }).catch(e => {
                notification.open({
                    content: 'Login or password is incorrect',
                    duration: -1,
                    closable: true,
                })
            }
        )
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            {notificationContext}
            <form className="pigi-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;