// PrepareOrderForm.js
import React, {useState} from 'react';
import './PrepareOrderForm.css'; // Import the CSS file for styling

const PrepareOrderForm = ({onSubmit, priceLists}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPriceList, setSelectedPriceList] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({name, description, selectedPriceList});
    };

    return (
        <div>
            <h2>Prepare create order script</h2>
            <form onSubmit={handleSubmit} className="pigi-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" cols={75} rows={6} value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="priceList">Price List:</label>
                    <select id="priceList" value={selectedPriceList}
                            onChange={(e) => setSelectedPriceList(e.target.value)}>
                        <option value="">Select Price List</option>
                        {priceLists.map((priceList) => (
                            <option key={priceList.id} value={priceList.id}>{priceList.name}</option>
                        ))}
                    </select>
                </div>
                <div className="button-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PrepareOrderForm;