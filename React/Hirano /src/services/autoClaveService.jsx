import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(plant_id, humidity_start, temperature_start, note) {
    return http.post(`${web_api_url}/autoclave`, {plant_id, humidity_start, temperature_start, note});
}

export function put(plant_id, humidity_start, temperature_start, start, note) {
    return http.put(`${web_api_url}/autoclave/${plant_id}`, { humidity_start, temperature_start, start, note});
}

export function postEnd(plant_id, humidity_end, temperature_end, note) {
    return http.post(`${web_api_url}/autoclave-end`, {plant_id, humidity_end, temperature_end, note});
}

export function putEnd(plant_id, humidity_end, temperature_end, end, note) {
    return http.put(`${web_api_url}/autoclave-end/${plant_id}`, { humidity_end, temperature_end, end, note});
}

export default {
    post,
    put,
    postEnd,
    putEnd
}