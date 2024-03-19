import React, {useState} from 'react';
import './ChangePassword.css';
import authenticationApiService from "../../api/authentication/authentication.api.service";
import history from "../../api/history/history";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [username, setUsername] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        authenticationApiService.requestChangePassword(username).then((success) => {
            toast.success('Change password request has been sent');
            history.push("/login")
        }).catch(e =>  toast.error('Login or password is incorrect'))
    }

    return (
        <div className="changepssword-container">
            <h2>Change Password</h2>
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