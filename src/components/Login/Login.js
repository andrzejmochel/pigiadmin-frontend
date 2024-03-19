// components/Login.js
import React, {useState} from 'react';
import './Login.css';
import {useAuth} from '../../api/authentication/AuthContext'
import toast from "react-hot-toast"
import {Link} from "react-router-dom";
import history from "../../api/history/history";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.promise(login(username, password), {
            loading : 'Authenticating ...',
            success: 'Cool you are in!',
            error: 'Login or password is not correct!'
        }).then((success) => {
            history.push("/");
        })
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
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
            <Link to="/changepassword/request">Change Password</Link>
        </div>
    );
}

export default Login;