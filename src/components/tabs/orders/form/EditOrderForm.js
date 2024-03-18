// PrepareOrderForm.js
import React, {useEffect, useState} from 'react';
import './PrepareOrderForm.css'; // Import the CSS file for styling

const EditOrderForm = ({onSubmit, order}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(order.name)
        setDescription(order.description)
    }, [order]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(order.id, {name, description});
    };

    return (
        <div>
            <h2>Edit order</h2>
            <form onSubmit={handleSubmit} className="pigi-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" cols={75} rows={6} value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div className="button-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditOrderForm;