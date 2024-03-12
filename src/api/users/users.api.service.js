import * as api from '../api'
import {API_URL} from '../../Env'

class UsersApiService {
    getConfirmedUsers = () => {
        return api.httpGET(`${API_URL}/users/confirmed`);
    };

    getNewUsers = () => {
        return api.httpGET(`${API_URL}/users/new`);
    };

    signUpUser = (signUp) => {
        return api.httpPOST(`${API_URL}/users/add`, {
            name : signUp.username,
            id : signUp.id
        })
    }

    delete(id) {
        return api.httpDelete(`${API_URL}/users/${id}`);
    }
}

const usersApiService = new UsersApiService();
export default usersApiService;
