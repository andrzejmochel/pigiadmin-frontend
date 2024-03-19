// PrepareOrderForm.js
import React, {useEffect, useState} from 'react';
import '../../form/PrepareOrderForm.css'; // Import the CSS file for styling

const EditOrderForm = ({onSubmit, order}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [finalizationDate, setFinalizationDate] = useState('');
    const [bagCost, setBagCost] = useState('');
    const [transportCost, setTransportCost] = useState('');


    useEffect(() => {
        const date =  order.finalizationDate ? new Date(order.finalizationDate) : new Date();
        setName(order.name)
        setDescription(order.description)
        setFinalizationDate(date.toISOString().split('T')[0])
        setBagCost(order.bagCost)
        setTransportCost(order.transportCost)
    }, [order]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date(finalizationDate);
        onSubmit(order.id, {name, description, finalizationDate : date.toISOString(), bagCost, transportCost});
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
                <div className="form-group">
                    <label htmlFor="finalizationDate">Finalization Date:</label>
                    <input
                        type="date"
                        id="finalizationDate"
                        value={finalizationDate}
                        onChange={(e) => setFinalizationDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bagCost">Bag Cost:</label>
                    <input
                        type="number"
                        id="bagCost"
                        value={bagCost}
                        onChange={(e) => setBagCost(e.target.value)}
                        step="0.01"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="transportCost">Transport Cost:</label>
                    <input
                        type="number"
                        id="transportCost"
                        value={transportCost}
                        onChange={(e) => setTransportCost(e.target.value)}
                        step="0.01"
                    />
                </div>
                <div className="button-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditOrderForm;