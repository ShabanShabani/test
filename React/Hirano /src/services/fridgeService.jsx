import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(name) {
    return http.post(`${web_api_url}/product-fridge`, {name});
}

export function postFridge(name, quantity, unit, price, supplier) {
    return http.post(`${web_api_url}/fridge-product`, {name, quantity, unit, price, supplier});
}

export function put(name, quantity, unit, price, supplier) {
    return http.put(`${web_api_url}/fridge-product/${name}`, { quantity, unit, price, supplier});
}

export function get() {
    return http.get(`${web_api_url}/fridge-products`);
}

export function getFridgeProducts() {
    return http.get(`${web_api_url}/stock-fridge-products`);
}

export default {
    post,
    put,
    get,
    getFridgeProducts,
    postFridge
}