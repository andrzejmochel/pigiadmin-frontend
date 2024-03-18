import React from "react";
import history from "../../../../../api/history/history";
import OrderMenu from "../../menu/OrderMenu";
import {useParams} from "react-router-dom";
import '../../Orders.css';


const OrderPayments = () => {
    let {orderId} = useParams();
    return (
        <div className="orders-container">
            <OrderMenu active={'payments'} orderId={orderId} history={history}>

            </OrderMenu>
        </div>
    )
}

export default OrderPayments;