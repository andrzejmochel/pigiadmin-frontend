import React, {useEffect, useState} from 'react';
import '../Orders.css';
import ordersApiService from "../../../../api/orders/orders.api.service";
import {useParams} from "react-router-dom";
import registrationsApiService from "../../../../api/registrations/registrations.api.service";

const Orders = () => {
    const [order, setOrder] = useState({});
    const [registrations, setRegistrations] = useState([]);
    let {orderId} = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const order = await ordersApiService.getOrder(orderId);
                setOrder(order);
                const response = await registrationsApiService.getOrderRegistrations(orderId);
                setRegistrations(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrder();
    }, [orderId]);


    const handleSynchronize = () => {
        ordersApiService.synchronize(orderId)
    };

    return (
        <div className="orders-container">
            <h2>{order.name}</h2>
            <div className="actions">
               <button onClick={handleSynchronize}>Synchronize</button>
            </div>
            <table className="pigi-table">
                <thead>
                <tr>
                    <th>Order Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {registrations.map((registration) => (
                    <tr key={registration.id}>
                        <td>{registration.email}</td>
                        <td>
                            {/*<button onClick={() => handleArchive(order.id)}>Archive</button>*/}
                            {/*<button onClick={() => handleShow(order.id)}>Show</button>*/}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default Orders;