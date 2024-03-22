import * as api from '../api'
import {API_URL} from '../../Env'

class RegistrationsApiService {
    async getOrderRegistrations(orderId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/registrations`);
    }

    getRegistration(orderId, registrationId) {
        return api.httpGET(`${API_URL}/orders/${orderId}/registrations/${registrationId}`);
    }
}

const registrationsApiService = new RegistrationsApiService();
export default registrationsApiService;

