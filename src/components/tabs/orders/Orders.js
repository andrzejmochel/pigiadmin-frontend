// Orders.js
import React, {useEffect, useState} from 'react';
import './Orders.css';
import ordersApiService from "../../../api/orders/orders.api.service";
import Modal from "../../Modal/Modal";
import PrepareOrderForm from "./form/PrepareOrderForm";
import priceListsApiService from "../../../api/pricelist/pricelists.api.service";
import history from "../../../api/history/history";
import toast from "react-hot-toast";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priceList, setPriceList] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await ordersApiService.getOrders();
                setOrders(response);
            } catch (error) {
                toast.error('Error fetching orders: ' + error);
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleArchive = (id) => {

    };
    const handleShow = (id) => {
        history.push(`/order/${id}/details`);
    };
    const handlePrepare = async () => {
        const response = await priceListsApiService.getPriceLists();
        setPriceList(response)
        setIsModalOpen(true)
    };

    const onPrepared = (preparedOrder) => {
        //todo
        setIsModalOpen(false);
        setPriceList([]);
    }

    return (
        <div className="orders-container">
            <div className="actions">
                <h2>Actions</h2>
                <button onClick={handlePrepare}>Prepare</button>
            </div>
            <h2>Orders</h2>
            <table className="pigi-table">
                <thead>
                <tr>
                    <th>Order Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.name}</td>
                        <td>
                            <button onClick={() => handleArchive(order.id)}>Archive</button>
                            <button onClick={() => handleShow(order.id)}>Show</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PrepareOrderForm onSubmit={onPrepared} priceLists={priceList}/>
            </Modal>
        </div>
    );
};

export default Orders;