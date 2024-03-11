import React, {useState} from 'react';
import './ChangePassword.css';
import {useNotification} from "rc-notification";
import authenticationApiService from "../../api/authentication/authentication.api.service";
import history from "../../api/history/history";
import {useParams} from "react-router-dom";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [notification, notificationContext] = useNotification({})
    const {pathToken} = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === repeatPassword) {
            authenticationApiService.confirmChangePassword(pathToken, password).then((success) => {
                notification.open({
                    content: 'Change password is done!',
                    duration: -1,
                    closable: true,
                    onClose: () => {
                        history.push("/login")
                    }
                })
            }).catch(e => {
                    notification.open({
                        content: 'Login or password is incorrect!',
                        duration: -1,
                        closable: true,
                    })
                }
            )
        } else {
            notification.open({
                content: 'Password are different!',
                duration: -1,
                closable: true,
            })
        }
    }

    return (
        <div className="changepssword-container">
            <h2>Confirm change password</h2>
            {notificationContext}
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