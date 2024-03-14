import * as api from '../api'
import {API_URL} from '../../Env'

class RegistrationsApiService {
    async getOrderRegistrations(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/registrations`);
    }
}

const registrationsApiService = new RegistrationsApiService();
export default registrationsApiService;

