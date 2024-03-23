import * as api from '../api'
import {API_URL} from '../../Env'

class OrdersApiService {
    getOrders = () => {
        return api.httpGET(`${API_URL}/orders`);
    };

    uploadOrderXls = (formData) => {
        return api.httpPOSTFormFile(`${API_URL}/orders/upload/xlsx`, formData, {
            'Content-Type': 'multipart/form-data'
        }).then(data => {
            return {data: new Blob([data]), filename: 'cards.zip'}
        })
    }

    getOrder(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}`);
    }

    updateOrderProperties = (orderId, properties) => {
        return api.httpPOST(`${API_URL}/orders/${orderId}/properties`, properties);
    }

    synchronize(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/synchronize`);
    }

    getOrderPositions(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/positions`);
    }

    reportSummary(orderId) {
        return api.httpGETFile(`${API_URL}/orders/${orderId}/reports/registrations/orders`).then(data => {
            return {data: new Blob([data]), filename: 'reportOrderData.docx'}
        })
    }

    calculatePayment(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/calculate/payments`);
    }

    getPayments(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/payments`);
    }

    async sendPaymentsNotifications(orderId, emailContent) {
        return api.httpPOST(`${API_URL}/orders/${orderId}/send/payment/notification`, { emailContent : emailContent})
    }

    sendSinglePaymentNotification(paymentId, emailContent) {
        return api.httpPOST(`${API_URL}/orders/send/payments/${paymentId}/notification`, { emailContent : emailContent})
    }

    generateCards(orderId) {
        return api.httpGETFile(`${API_URL}/orders/${orderId}/payment/cards`).then(data => {
            return {data: new Blob([data]), filename: 'cards.zip'}
        })
    }

    getPayment(orderId, registrationId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/registration/${registrationId}/payment`);
    }

    getPaymentsSummary(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/payments/summary`);
    }

    provideRealCost(paymentId, realCost) {
        return api.httpPOST(`${API_URL}/orders/payments/${paymentId}/real/cost`, {realCost: realCost})
    }

    sendRealCost(paymentId, summary) {
        // /orders/payments/one/payment/real/cost/notification
        return api.httpPOST(`${API_URL}/orders/payments/one/payment/real/cost/notification`, {paymentIds: [paymentId], summary: summary})
    }

    pay(paymentId, amount) {
        return api.httpPOST(`${API_URL}/orders/payments/${paymentId}/pay`, {amount: amount, summary: ''})
    }
}

const ordersApiService = new OrdersApiService();
export default ordersApiService;

