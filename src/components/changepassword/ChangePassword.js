import React, {useState} from 'react';
import './ChangePassword.css';
import {useNotification} from "rc-notification";
import authenticationApiService from "../../api/authentication/authentication.api.service";
import history from "../../api/history/history";

const ChangePassword = ({onLoginSuccess}) => {
    const [username, setUsername] = useState('');
    const [notification, notificationContext] = useNotification({})

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticationApiService.requestChangePassword(username).then((success) => {
            notification.open({
                content: 'Change password request has been sent',
                duration: -1,
                closable: true,
                onClose:() => {
                    history.push("/login")
                }
            })
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
        <div className="changepssword-container">
            <h2>Change Password</h2>
            {notificationContext}
            <form className="pigi-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <button type="submit">Change</button>
            </form>
        </div>
    );
}

export default ChangePassword;