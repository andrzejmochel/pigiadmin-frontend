import React from "react";
import OrderMenu from "../../menu/OrderMenu";
import {useParams} from "react-router-dom";
import history from "../../../../../api/history/history";
import '../../Orders.css';


const OrderPackages = () => {
    let {orderId} = useParams();

    return (
        <div className="orders-container">
            <OrderMenu active={'packages'} orderId={orderId} history={history} >

            </OrderMenu>
        </div>
    )
}

export default OrderPackages;