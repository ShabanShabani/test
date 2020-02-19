import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post() {
    return http.post(`${web_api_url}/plant`);
}

export function get(plant_id) {
    return http.get(`${web_api_url}/plant/${plant_id}`);
}

export function getAll() {
    return http.get(`${web_api_url}/plants`);
}

export function getShelf(id) {
    return http.get(`${web_api_url}/shelf/${id}`);
}

export function getShelfGrowing(id) {
    return http.get(`${web_api_url}/shelf-growing/${id}`);
}

export function getFitlerDate(filter_date, items_on_page) {
    return http.post(`${web_api_url}/plant-filter`, {filter_date, items_on_page});
}

export function getFitlerSearch(filter_search, items_on_page) {
    return http.post(`${web_api_url}/plant-search`, {filter_search, items_on_page});
}

// export function getPagination(page, items_on_page) {
//     return http.get(`${web_api_url}/plants/${page}/${items_on_page}`);
// }
export function getPagination(page, items, filter_date, filter_date_to, filter_search, filter_type) {
    return http.post(`${web_api_url}/plants`, { page, items, filter_date, filter_date_to, filter_search, filter_type});
}

export default {
    post,
    get,
    getAll,
    getShelf,
    getFitlerDate,
    getFitlerSearch,
    getPagination,
    getShelfGrowing
}