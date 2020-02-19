import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(plant_id, anticipated_quantity) {
    return http.post(`${web_api_url}/job-report`, {plant_id, anticipated_quantity});
}

export function put(plant_id, dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note) {
    return http.put(`${web_api_url}/job-report/${plant_id}`, { dru_bungu, dru_ahu, krunde, miser_bluar, gips, shkums, uje, nr_bllokave, kese, note});
}

export function get(plant_id) {
    return http.get(`${web_api_url}/job-report/${plant_id}`);
}

export default {
    post,
    put,
    get
}