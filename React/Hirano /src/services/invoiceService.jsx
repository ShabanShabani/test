import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(client_name, business_number, address, plants, total, sasia) {
    return http.post(`${web_api_url}/invoice`, {client_name, business_number, address, plants, total, sasia});
}

export function getBlocks() {
    return http.get(`${web_api_url}/blocks`);
}

export function getMushroom() {
    return http.get(`${web_api_url}/mushroom`);
}

export function getAll() {
    return http.get(`${web_api_url}/invoice`);
}

export default {
    post,
    getBlocks,
    getMushroom,
    getAll
}