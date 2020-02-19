import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        "content-type": "multipart/form-data"
    }
};

http.setJwt(getJwt());

export async function get() {
    return await http.get(`${web_api_url}/driving-licenses`);
}

export function put(id, value) {
    return http.put(`${web_api_url}/driving-licenses`, { value });
}

export function post(value) {
    let data = new FormData();
    data.append("value", value);
    return http.post(`${web_api_url}/driving-license`, data, multipartHeader);
}

export default {
    get,
    put,
    post,
};