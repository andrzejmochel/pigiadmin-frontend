import React, {useEffect, useState} from "react";
import history from "../../../../../api/history/history";
import OrderMenu from "../../menu/OrderMenu";
import {useParams} from "react-router-dom";
import '../../Orders.css';
import ordersApiService from "../../../../../api/orders/orders.api.service";
import Modal from "../../../../Modal/Modal";
import SendPaymentsForm from "./form/SendPaymentsForm";
import toast from "react-hot-toast";
import fileDownload from "js-file-download";


const OrderPayments = () => {
    const [payments, setPayments] = useState([])
    const [paymentId, setPaymentId] = useState(null)
    const [isSendPaymentsModalVisible, setIsSendPaymentsModalVisible] = useState(false)
    const [isSendSinglePaymentModalVisible, setIsSendSinglePaymentModalVisible] = useState(false)
    let {orderId} = useParams();

    useEffect(() => {
        fetchPayments(orderId)
    }, [orderId]);

    const fetchPayments = async (id) => {
        const result = await  ordersApiService.getPayments(id)
        setPayments(result);
    };
    const handlePaymentsCalculation = async () => {
        await toast.promise(ordersApiService.calculatePayment(orderId), {
            loading: 'Calculating payments ...',
            success: <b>Payments created</b>,
            error: <b>Error while calculating payments</b>
        });
        fetchPayments(orderId);
    };

    const onSendPayments = async (emailContent) => {
        await toast.promise(ordersApiService.sendPaymentsNotifications(orderId, emailContent), {
            loading: 'Sending mails ...',
            success: <b>Mails have been send</b>,
            error: <b>Mails have not been send</b>
        });
             setIsSendPaymentsModalVisible(false)
    }

    const onSendSinglePayment = async (emailContent) => {
        await toast.promise(ordersApiService.sendSinglePaymentNotification(paymentId, emailContent), {
            loading: 'Sending mail ...',
            success: <b>Mail has been send</b>,
            error: <b>Mail has not been send</b>
        });
        setIsSendSinglePaymentModalVisible(false)
        setPaymentId(null)
    }

    const handleSendSinglePayment = (id) => {
        setPaymentId(id);
        setIsSendSinglePaymentModalVisible(true)
    };
    const handleSendPayments = () => {
        setIsSendPaymentsModalVisible(true)
    };

    const handleCards = async ()=> {
        await toast.promise(ordersApiService.generateCards(orderId), {
            loading: 'Generating cards ...',
            success: <b>Cards generated!</b>,
            error: <b>Cards generation fails!</b>
        }).then((success) => {
            fileDownload(success.data, success.filename);
        });
    }

    return (
        <div className="orders-container">
            <OrderMenu active={'payments'} orderId={orderId} history={history}>
                <button onClick={handlePaymentsCalculation}>Calculate payments</button>
                <button onClick={handleSendPayments}>Send</button>
                <button onClick={handleCards}>Cards</button>
            </OrderMenu>
            <table className="pigi-table">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Price [PLN]</th>
                    <th>RealPrice [PLN]</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id}>
                        <td>{payment.registrationEmail}</td>
                        <td>{payment.fullPrice}</td>
                        <td>{payment.realCost}</td>
                        <td>
                           <button onClick={() => handleSendSinglePayment(payment.id)}>Send</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isSendPaymentsModalVisible} onClose={() => setIsSendPaymentsModalVisible(false)}>
                <SendPaymentsForm onSubmit={onSendPayments}></SendPaymentsForm>
            </Modal>

            <Modal isOpen={isSendSinglePaymentModalVisible}  onClose={() => setIsSendSinglePaymentModalVisible(false)}>
                <SendPaymentsForm onSubmit={onSendSinglePayment}></SendPaymentsForm>
            </Modal>
        </div>
    )
}

export default OrderPayments;