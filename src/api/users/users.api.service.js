import * as api from '../api'
import {API_URL} from '../../Env'

class UsersApiService {
    getUsers = () => {
        return api.httpGET(`${API_URL}/users`);
    };

    signUpUser(signUp) {
        return api.httpPOST(`${API_URL}/users/add`, {
            name : signUp.username,
            id : signUp.id
        })
    }
}

const usersApiService = new UsersApiService();
export default usersApiService;
