import React, {useEffect, useState} from 'react';
import Modal from '../../Modal/Modal';
import PriceListForm from './form/PriceListForm'; // Renamed from AddPriceListForm
import './PriceLists.css';
import priceListsApiService from "../../../api/pricelist/pricelists.api.service"; // Import the CSS file for styling

const PriceLists = () => {
    // Dummy data for price lists (replace with your actual data)
    const [priceLists, setPriceLists] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPriceListId, setSelectedPriceListId] = useState(null);

    const fetchPriceLists = async () => {
        try {
            const response = await priceListsApiService.getPriceLists();

            setPriceLists(response); // Update the price lists state with the fetched data
        } catch (error) {
            console.error('Error fetching price lists:', error);
        }
    };

    // Fetch price lists when the component mounts
    useEffect(() => {
        fetchPriceLists();
    }, []); // Empty dependency array ensures the effect runs only once


    const handleAddPriceList = (newPriceList) => {
        setPriceLists([...priceLists, newPriceList]);
        setIsModalOpen(false);
    };

    const handleEditPriceList = (id) => {
        setSelectedPriceListId(id);
        setIsModalOpen(true);
    };

    const handleDeletePriceList = async (id) => {
        await priceListsApiService.deletePriceLists(id)
        fetchPriceLists();
    };

    return (
        <div>
            <h2>Price Lists</h2>
            <table className="price-lists-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {priceLists.map((priceList) => (
                    <tr key={priceList.id}>
                        <td>{priceList.name}</td>
                        <td>
                            <button onClick={() => handleEditPriceList(priceList.id)}>Edit</button>
                            <button onClick={() => handleDeletePriceList(priceList.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PriceListForm onSubmit={handleAddPriceList} priceListId={selectedPriceListId}/>
            </Modal>
        </div>
    );
}

export default PriceLists;