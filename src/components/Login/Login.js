// components/Login.js
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import {useAuth} from '../../api/authentication/AuthContext'

const Login = ({onLoginSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password).then((success) => {
            navigate('/');
        }).catch(e => setError("Login error"))
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Login;