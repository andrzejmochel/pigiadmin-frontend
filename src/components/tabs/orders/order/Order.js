import React, {useEffect, useState} from 'react';
import '../Orders.css';
import ordersApiService from "../../../../api/orders/orders.api.service"
import {Switch, useParams} from "react-router-dom";
import ProtectedRoute from "../../../../ProtectedRoute";
import OrderPaths from "../../../../paths/OrderPaths";


const Order = () => {
    const [order, setOrder] = useState({});
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




    return (
        <div className="orders-container">
            <h2>{order.name}</h2>
            <Switch>
                <ProtectedRoute children={<OrderPaths />} path={"/"}></ProtectedRoute>
            </Switch>
        </div>
    );
};

export default Order;