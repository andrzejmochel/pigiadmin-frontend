import * as api from '../api'
import {API_URL} from '../../Env'

class AuthenticationApiService {
    requestChangePassword = (login) => {
        return api.httpPOST(`${API_URL}/request/changepassword`, {"login": login});
    };

    confirmChangePassword(token, password) {
        return api.httpPOST(`${API_URL}/confirm/changepassword`, {"token": token, "password": password});
    }
}

const authenticationApiService = new AuthenticationApiService();
export default authenticationApiService;

