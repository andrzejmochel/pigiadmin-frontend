import React, { useState } from 'react';
import './PriceListForm.css'; // Import the CSS file for styling

const PriceListForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation here
        if (!name || !description) {
            alert('Please enter name and description');
            return;
        }
        // Call onSubmit function to add new price list
        onSubmit({ name, description });
    }

    return (
        <form onSubmit={handleSubmit} className="price-list-form">
            <div className="price-list-form-group">
                <label htmlFor="name" className="price-list-label">Name:</label>
                <input type="text" id="name" className="price-list-input" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="price-list-form-group">
                <label htmlFor="description" className="price-list-label">Description:</label>
                <textarea id="description" className="price-list-input" value={description}
                          onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button type="submit" className="price-list-btn">Add</button>
        </form>
    );
}

export default PriceListForm;