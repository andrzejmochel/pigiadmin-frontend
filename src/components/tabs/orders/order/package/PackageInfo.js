import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ordersApiService from "../../../../../api/orders/orders.api.service";
import toast from "react-hot-toast";
import "./PackageInfo.css"

const PackageInfo = () => {
    let {orderId, registrationId, packageNb} = useParams();
    const [payment, setPayment] = useState(null)
    const [orderPackage, setOrderPackage] = useState(null)

    const fetchData = async (orderId, registrationId, packageNb) => {
        const result = await toast.promise(
            ordersApiService.getPayment(orderId, registrationId),
            {
                loading: 'Loading data ...',
                success: <b>Data loaded</b>,
                error: <b>Data load failed</b>
            });

        setPayment(result.content)
        setOrderPackage(result.content.orderPackages[packageNb - 1])
    };

    useEffect(() => {
        fetchData(orderId, registrationId, packageNb);
    }, [orderId, registrationId, packageNb]);

    return (
        <div className="package-info-container">
            <div className="package-info-section">
                <h3>User order information</h3>
                <p><b>Products price:</b> {payment.realCost ? `${payment.realCost} PLN` : 'not provided yet'}</p>
                <p><b>Predicted products price:</b> {payment.fullPrice} PLN</p>
            </div>
            <div className="package-info-section">
                <h3>Package: {orderPackage.name}</h3>
            </div>
        </div>
    )
}

export default PackageInfo;

