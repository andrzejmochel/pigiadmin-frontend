import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import PriceListForm from './form/PriceListForm'; // Renamed from AddPriceListForm
import './PriceLists.css'; // Import the CSS file for styling

const PriceLists = () => {
    // Dummy data for price lists (replace with your actual data)
    const [priceLists, setPriceLists] = useState([
        { name: 'Standard Price List', description: 'Standard pricing for all products' },
        { name: 'VIP Price List', description: 'Special pricing for VIP customers' },
        { name: 'Wholesale Price List', description: 'Bulk pricing for wholesalers' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPriceList = (newPriceList) => {
        setPriceLists([...priceLists, newPriceList]);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Price Lists</h2>
            <table className="price-lists-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {priceLists.map((priceList, index) => (
                    <tr key={index}>
                        <td>{priceList.name}</td>
                        <td>{priceList.description}</td>
                        <td><button onClick={() => setIsModalOpen(true)}>Add Price List</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PriceListForm onAdd={handleAddPriceList} />
            </Modal>
        </div>
    );
}

export default PriceLists;