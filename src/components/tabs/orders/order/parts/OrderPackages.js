import React, {useEffect, useState} from "react";
import OrderMenu from "../../menu/OrderMenu";
import {useParams} from "react-router-dom";
import history from "../../../../../api/history/history";
import '../../Orders.css';
import ordersApiService from "../../../../../api/orders/orders.api.service";
import registrationsApiService from "../../../../../api/registrations/registrations.api.service";
import fileDownload from "js-file-download";


const OrderPackages = () => {
    const [positions , setPositions] = useState([])
    let {orderId} = useParams();

    useEffect(() => {

        fetchOrderPositions(orderId)
    }, [orderId]);

    const fetchOrderPositions = async (orderId) => {
        const result = await ordersApiService.getOrderPositions(orderId)
        const registrations = await registrationsApiService.getOrderRegistrations(orderId);
        const registrationsMap = registrations.reduce((map, r) => {
            map[r.id] = r;
            return map;
        })
        const positions = result.map((p) => {
            p.registration = registrationsMap[p.registration]
            return p;
        })
        setPositions(positions)
    }

    const handleOrderReport = async (e) => {
        e.preventDefault();

        try {
            const response = await ordersApiService.reportSummary(orderId);
            fileDownload(response.data, response.filename);
        } catch (error) {
            console.error('Error report file:', error);
        }
    };

    return (
        <div className="orders-container">
            <OrderMenu active={'packages'} orderId={orderId} history={history}>
                <button onClick={handleOrderReport}>Order report</button>
            </OrderMenu>
            <table className="pigi-table">
                <thead>
                <tr>
                    <th>Registration Name</th>
                    <th>Synchronization time</th>
                    <th>Package nb</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {positions.map((position) => (
                    <tr key={position.id}>
                        <td>{position.registration ? position.registration.email : '' }</td>
                        <td>{position.synchronizationTime}</td>
                        <td>{position.content.orderPackages.length}</td>
                        <td>
                            {/*<button onClick={() => handleArchive(order.id)}>Archive</button>*/}
                            {/*<button onClick={() => handleShow(order.id)}>Show</button>*/}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderPackages;