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
import RealCostForm from "./form/RealCostForm";


const OrderPayments = () => {
    const [payments, setPayments] = useState([])
    const [payment, setPayment] = useState({})
    const [isSendPaymentsModalVisible, setIsSendPaymentsModalVisible] = useState(false)
    const [isSendSinglePaymentModalVisible, setIsSendSinglePaymentModalVisible] = useState(false)
    const [isRealCostModalVisible, setIsRealCostModalVisible] = useState(false)
    let {orderId} = useParams();

    useEffect(() => {
        fetchPayments(orderId)
    }, [orderId]);

    const fetchPayments = async (id) => {
        const result = await ordersApiService.getPayments(id)
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
        await toast.promise(ordersApiService.sendSinglePaymentNotification(payment.id, emailContent), {
            loading: 'Sending mail ...',
            success: <b>Mail has been send</b>,
            error: <b>Mail has not been send</b>
        });
        setIsSendSinglePaymentModalVisible(false)
        setPayment(null)
    }

    const handleSendSinglePayment = (payment) => {
        setPayment(payment);
        setIsSendSinglePaymentModalVisible(true)
    };
    const handleSendPayments = () => {
        setIsSendPaymentsModalVisible(true)
    };

    const handleCards = async () => {
        await toast.promise(ordersApiService.generateCards(orderId), {
            loading: 'Generating cards ...',
            success: <b>Cards generated!</b>,
            error: <b>Cards generation fails!</b>
        }).then((success) => {
            fileDownload(success.data, success.filename);
        });
    }

    const handleRealCost = (payment) => {
        setPayment(payment)
        setIsRealCostModalVisible(true)
    };

    const onRelaCostProvided = async (realCost) => {
        await toast.promise(ordersApiService.provideRealCost(realCost.paymentId, realCost.realCost), {
            loading: 'Saving real cost',
            success: 'saved',
            error: 'can not save real cost'
        });
        await toast.promise(ordersApiService.sendRealCost(realCost.paymentId), {
            loading: 'Sending real cost...',
            success: 'Sent',
            error: 'can not sent real cost'
        });
        fetchPayments(orderId)
        setPayment(null)
        setIsRealCostModalVisible(false)
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
                            <button onClick={() => handleSendSinglePayment(payment)}>Send</button>
                            <button onClick={() => handleRealCost(payment)}>Real Cost</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isSendPaymentsModalVisible} onClose={() => setIsSendPaymentsModalVisible(false)}>
                <SendPaymentsForm onSubmit={onSendPayments}></SendPaymentsForm>
            </Modal>

            <Modal isOpen={isRealCostModalVisible} onClose={() => setIsRealCostModalVisible(false)}>
                <RealCostForm payment={payment} onSubmit={onRelaCostProvided}></RealCostForm>
            </Modal>

            <Modal isOpen={isSendSinglePaymentModalVisible} onClose={() => setIsSendSinglePaymentModalVisible(false)}>
                <SendPaymentsForm onSubmit={onSendSinglePayment}></SendPaymentsForm>
            </Modal>
        </div>
    )
}

export default OrderPayments;