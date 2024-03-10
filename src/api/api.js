import axios from 'axios';
import history from './history/history'
import tokenCookie from "./authentication/TokenCookie";

function isHtml401(error) {
    console.log(error.response);
    return error?.response?.status === 401;
}

function handleError(error) {
    if (isHtml401(error)) {
        tokenCookie.cleanToken();
        history.push('/login')
    }
    return undefined;
}

export const httpGET = (url, headers = {}, params = {}) => (
    axios.get(`${url}`, {
        "headers": addSecurityHeaders(headers),
        params
    })
        .then(mapResponse)
        .catch(error => handleError(error)
        )
);

export const httpGETFile = (url, headers = {}, params = {}) => (
    axios.get(`${url}`, {
        "headers": addSecurityHeaders(headers),
        responseType: 'blob',
        params
    })
        .then(mapResponseToFile)
        .catch(error => handleError(error)
        )
);

export const httpPOSTFormFile = (url, data = {}, headers = {}, params = {}) => (
    axios.postForm(`${url}`, data, {
        "headers": addSecurityHeaders(headers),
        responseType: 'blob',
        params
    })
        .then(mapResponseToFile)
        .catch(error => handleError(error)
        )
);

export const httpDelete = (url, headers = {}, params = {}) => {
   return  axios.delete(`${url}`, {
        "headers": addSecurityHeaders(headers),
        responseType: 'blob',
        params
    })
       .then(mapResponse)
}


export const httpPOST = (url, data = {}, headers = {},/*URLSearchParams*/params = undefined) => (
    axios.post(`${url}`, data, {
        "headers": addSecurityHeaders(headers),
        "params": params
    })
        .then(mapResponse)
);

const mapResponseToFile = response => {
    return new Blob([response.data])
};

const mapResponse = response => {
    return response.data;
};


const addSecurityHeaders = (headers = {}) => {
    return !tokenCookie.isToken() ? headers : {
        ...headers,
        ...{ "Authorization": 'Bearer ' + tokenCookie.getToken() }
    }
};
