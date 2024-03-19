import React, {useState} from 'react';
import './ChangePassword.css';
import authenticationApiService from "../../api/authentication/authentication.api.service";
import history from "../../api/history/history";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const {pathToken} = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            authenticationApiService.confirmChangePassword(pathToken, password).then((success) => {
                toast.success('Change password is done!');
                history.push("/login");
            }).catch(e => toast.error('Communication problem!'))
        } else {
            toast.error('Passwords are different!')
        }
    }

    return (
        <div className="changepssword-container">
            <h2>Confirm change password</h2>
            <form className="pigi-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Repeat passeord" value={repeatPassword}
                           onChange={(e) => setRepeatPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Token" value={pathToken} disabled={true}/>
                </div>
                <button type="submit">Change</button>
            </form>
        </div>
    );
}

export default ChangePassword;