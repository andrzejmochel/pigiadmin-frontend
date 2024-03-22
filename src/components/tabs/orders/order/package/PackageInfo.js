import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ordersApiService from "../../../../../api/orders/orders.api.service";
import toast from "react-hot-toast";
import "./PackageInfo.css"
import registrationsApiService from "../../../../../api/registrations/registrations.api.service";

const PackageInfo = () => {
    let {orderId, registrationId, packageNb} = useParams();
    const [payment, setPayment] = useState({})
    const [registration, setRegistration] = useState({})

    const fetchData = async (orderId, registrationId, packageNb) => {
        const result = await toast.promise(
            Promise.all([ordersApiService.getPayment(orderId, registrationId), registrationsApiService.getRegistration(orderId, registrationId)])
            ,
            {
                loading: 'Loading data ...',
                success: <b>Data loaded</b>,
                error: <b>Data load failed</b>
            });

        setPayment(result[0].content)
        setRegistration(result[1])
    };

    useEffect(() => {
        fetchData(orderId, registrationId, packageNb);
    }, [orderId, registrationId, packageNb]);

    const toPay = () => {
        if(payment.realCost) {
            const product = payment.realCost ? payment.realCost : 0.0;
            const bags = payment.bagsCost ? payment.bagsCost : 0.0;
            const transport = payment.transportCost ? payment.transportCost : 0.0;
            const fullCost = product + bags + transport;
            return `${fullCost} PLN`
        }
        return 'brak kosztu całkowitego'
    }

    return (
        <div className="package-info-container">
            <div className="package-info-section">
                <h3>Informacje o zamówieniu <b>{registration.email ? `${registration.email}` : ''}</b></h3>
                <p><b>Rzeczywista cena twaru:</b> {payment.realCost ? `${payment.realCost} PLN` : 'nie wypełniona'}</p>
                <p><b>Planowana cena
                    towaru:</b> {payment.productsCost ? `${payment.productsCost} PLN` : 'nie wypełniona'}</p>
                <p><b>Transport:</b> {payment.transportCost ? `${payment.transportCost} PLN` : 'nie wypełniony'}</p>
                <p><b>Torby:</b> {payment.bagsCost ? `${payment.bagsCost} PLN` : 'nie wypełnione'}</p>
                <br/>
                <br/>
                <p><b>DO ZAPŁATY</b> {toPay()} </p>

            </div>
            <div className="package-info-section">
                {/*<h3>Package: {orderPackage.name}</h3>*/}
            </div>
        </div>
    )
}

export default PackageInfo;

