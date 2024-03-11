// Orders.js
import React, {useEffect, useState} from 'react';
import './Orders.css';
import {useNotification} from 'rc-notification';
import ordersApiService from "../../../api/orders/orders.api.service";
import Modal from "../../Modal/Modal";
import PrepareOrderForm from "./form/PrepareOrderForm";
import priceListsApiService from "../../../api/pricelist/pricelists.api.service";
import {useRouteMatch} from "react-router-dom";
import history from "../../../api/history/history";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priceList, setPriceList] = useState([])
    const [notice, context] = useNotification({closable: true, maxCount: 1})
    const match = useRouteMatch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await ordersApiService.getOrders();
                setOrders(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleArchive = (id) => {

    };
    const handleShow = (id) => {

    };
    const handlePrepare = async () => {
        const response = await priceListsApiService.getPriceLists();
        setPriceList(response)
        setIsModalOpen(true)
    };

    const onPrepared = (preparedOrder) => {
        notice.open({
            content: `${new Date().toISOString()}`,
            duration: -1,
            placement: "top"
        });
        setIsModalOpen(false);
        setPriceList([]);
    }

    const handleUpload = () => {
        history.push(`${match.url}/upload`);
    };

    return (
        <div className="orders-container">
            {context}
            <div className="actions">
                <h2>Actions</h2>
                <button onClick={handlePrepare}>Prepare</button>
                <button onClick={handleUpload}>Upload</button>
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