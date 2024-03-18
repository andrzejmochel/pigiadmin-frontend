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
}

const ordersApiService = new OrdersApiService();
export default ordersApiService;

