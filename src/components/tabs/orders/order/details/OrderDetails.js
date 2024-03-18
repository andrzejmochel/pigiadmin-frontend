import React, {useEffect, useState} from 'react';
import '../../Orders.css';
import './OrderDetails.css';
import ordersApiService from "../../../../../api/orders/orders.api.service";
import {useParams} from "react-router-dom";
import Modal from "../../../../Modal/Modal";
import EditOrderForm from "../form/EditOrderForm";
import OrderMenu from "../../menu/OrderMenu";
import history from "../../../../../api/history/history";

const OrderDetails = () => {
    const [order, setOrder] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(null);
    let {orderId} = useParams();


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const order = await ordersApiService.getOrder(orderId);
                setOrder(order);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrder();
    }, [orderId]);


    const handleSynchronize = () => {
        ordersApiService.synchronize(orderId)
    };

    const handleEdit = () => {
        setIsModalOpen(true)
    };

    const onEditOrder = async (id, properties) => {
        const edit = await ordersApiService.updateOrderProperties(id, properties)
        setOrder(edit);
        setIsModalOpen(false)
    }

    return (
        <div>
            <OrderMenu orderId={orderId} history={history} active={"details"}>
                <button onClick={handleSynchronize}>Synchronize</button>
                <button onClick={handleEdit}>Edit</button>
            </OrderMenu>
            <div className="orders-details">
                <p><b>Name:</b><br/>{order.name}</p>
                <p><b>Description:</b><br/>{order.description}</p>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <EditOrderForm order={order} onSubmit={onEditOrder}/>
            </Modal>
        </div>

    );
};

export default OrderDetails;