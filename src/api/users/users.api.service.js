import * as api from '../api'
import {API_URL} from '../../Env'

class UsersApiService {
    getUsers = () => {
        return api.httpGET(`${API_URL}/users`);
    };
}

const usersApiService = new UsersApiService();
export default usersApiService;
