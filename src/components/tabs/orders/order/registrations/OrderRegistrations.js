import React from "react";
import {useParams} from "react-router-dom";
import OrderMenu from "../../menu/OrderMenu";
import history from "../../../../../api/history/history";
import "../../Orders.css"


const OrderRegistrations = () => {
    let {orderId} = useParams();
    return (
        <div className="orders-details">
            <OrderMenu active={'registrations'} orderId={orderId} history={history}>

            </OrderMenu>
        </div>
    )

}

export default OrderRegistrations;