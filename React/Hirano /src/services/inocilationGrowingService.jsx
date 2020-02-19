import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(plant_id, nr_seed, nr_blocks_damage, date_seeds, note, histories) {
    return http.post(`${web_api_url}/inoculation-room-growing`, {plant_id, nr_seed, nr_blocks_damage, date_seeds, note, histories});
}

export function postFridge(plant_id) {
    return http.post(`${web_api_url}/fridge-plant/${plant_id}`);
}

export function put(plant_id, nr_seed, nr_blocks_damage, date_seeds, note, histories) {
    return http.put(`${web_api_url}/inoculation-room-growing/${plant_id}`, { nr_seed, nr_blocks_damage, date_seeds, note, histories});
}

export default {
    post,
    put,
    postFridge
}