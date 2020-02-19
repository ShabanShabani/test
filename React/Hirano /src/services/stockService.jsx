import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(name) {
    return http.post(`${web_api_url}/product`, {name});
}

export function postStock(name, quantity, unit, price, supplier, otherName) {
    return http.post(`${web_api_url}/stock-product`, {name, quantity, unit, price, supplier, otherName});
}

export function put(name, quantity, unit, price, supplier, otherName) {
    return http.put(`${web_api_url}/stock-product/${name}`, { quantity, unit, price, supplier, otherName});
}

export function putLimit(name, min_stock) {
    return http.put(`${web_api_url}/stock-product-min/${name}`, { min_stock});
}

export function get() {
    return http.get(`${web_api_url}/products`);
}

export function getStockProducts() {
    return http.get(`${web_api_url}/stock-products`);
}

export function getStockAlert() {
    return http.get(`${web_api_url}/stock-alert`);
}

export default {
    post,
    put,
    postStock,
    get,
    getStockProducts,
    getStockAlert,
    putLimit
}