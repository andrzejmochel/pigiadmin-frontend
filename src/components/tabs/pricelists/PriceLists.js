import React, {useEffect, useState} from 'react';
import Modal from '../../Modal/Modal';
import PriceListForm from './form/PriceListForm';
import './PriceLists.css';
import priceListsApiService from "../../../api/pricelist/pricelists.api.service";
import { v4 as uuidv4 } from 'uuid';

const PriceLists = () => {
    // Dummy data for price lists (replace with your actual data)
    const [priceLists, setPriceLists] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPriceList, setSelectedPriceList] = useState(null);

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


    const onPriceListEdit = async (newPriceList) => {
        try {
            await priceListsApiService.savePriceList(newPriceList)
            setSelectedPriceList(null);
            setIsModalOpen(false);
            await fetchPriceLists();
        } catch(e) {
            console.log('saving failed')
        }
    };

    const handleEditPriceList = async (id) => {
        const response =  await priceListsApiService.getPriceList(id);
        setSelectedPriceList(response)
        setIsModalOpen(true);

    };

    const handleCopyPriceList = async (id) => {
        const response =  await priceListsApiService.getPriceList(id);
        const copiedList = { ...response, id : uuidv4(), name : '' }
        setSelectedPriceList(copiedList)
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
                            <button onClick={() => handleCopyPriceList(priceList.id)}>Copy</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PriceListForm onSubmitPriceList={onPriceListEdit} priceList={selectedPriceList}/>
            </Modal>
        </div>
    );
}

export default PriceLists;