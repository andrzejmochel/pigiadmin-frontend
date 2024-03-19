import React, {useEffect, useState} from 'react';
import '../../Orders.css';
import './OrderDetails.css';
import ordersApiService from "../../../../../api/orders/orders.api.service";
import {useParams} from "react-router-dom";
import Modal from "../../../../Modal/Modal";
import EditOrderForm from "../form/EditOrderForm";
import OrderMenu from "../../menu/OrderMenu";
import history from "../../../../../api/history/history";
import toast from "react-hot-toast";

const OrderDetails = () => {
    const [order, setOrder] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(null);
    let {orderId} = useParams();


    useEffect(() => {
        const fetchOrder = async () => {
                const order = await toast.promise(ordersApiService.getOrder(orderId), {
                    loading : 'Loading order',
                    success : 'Order loaded',
                    error : 'order load failed'
                }, {
                    success : {
                        duration : -1
                    }
                });
                setOrder(order);
        };
        fetchOrder();
    }, [orderId]);


    const handleSynchronize = async () => {
        await toast.promise(ordersApiService.synchronize(orderId), {
            loading: 'Synchronizing with google ...',
            success: <b>Synchronizing completed</b>,
            error: <b>Could not synchronize</b>
        })
    };

    const handleEdit = () => {
        setIsModalOpen(true)
    };

    const onEditOrder = async (id, properties) => {
        const edit = await toast.promise(ordersApiService.updateOrderProperties(id, properties), {
            loading: 'Saving order properties ...',
            success: <b>Order saved!</b>,
            error: <b>Could not save order!</b>
        })
        setOrder(edit);
        setIsModalOpen(false)
    }

    function formatDate(finalizationDate) {
        if (finalizationDate) {
            const date = new Date(finalizationDate)
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
            return formattedDate;
        }
        return 'none'
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
                <p><b>Finalization date:</b><br/>{formatDate(order.finalizationDate)}</p>
                <p><b>Transport cost:</b><br/>{order.transportCost ? order.transportCost : '0,0'} PLN</p>
                <p><b>Bag cost:</b><br/>{order.bagCost ? order.bagCost : '0,0' } PLN</p>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <EditOrderForm order={order} onSubmit={onEditOrder}/>
            </Modal>
        </div>

    );
};

export default OrderDetails;