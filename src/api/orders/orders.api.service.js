import * as api from '../api'
import {API_URL} from '../../Env'

class OrdersApiService {
    getOrders = () => {
        return api.httpGET(`${API_URL}/orders`);
    };
}

const ordersApiService = new OrdersApiService();
export default ordersApiService;

