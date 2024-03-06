import * as api from '../api'
import {API_URL} from '../../Env'

class PriceListsApiService {
    getPriceLists = () => {
        return api.httpGET(`${API_URL}/pricelists`);
    };

    deletePriceLists = (id) => {
        return api.httpDelete(`${API_URL}/pricelists/${id}`)
    }

    getPriceList(id) {
        return api.httpGET(`${API_URL}/pricelists/${id}`);
    }
}

const priceListsApiService = new PriceListsApiService();
export default priceListsApiService;

