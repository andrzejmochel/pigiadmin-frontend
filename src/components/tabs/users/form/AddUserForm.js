import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

const AddUserForm = ({onSubmit}) => {
    const [name, setName] = useState('');


    const handleSubmit = () => {
        onSubmit(
            {
                username : name,
                id : uuidv4()
            }
        )
    };

    return (
        <div>
            <h2>Prepare create order script</h2>
            <form onSubmit={handleSubmit} className="pigi-form">
                <div className="form-group">
                    <label htmlFor="name">User name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="button-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
export default AddUserForm;