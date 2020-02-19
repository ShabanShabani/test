import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(plant_id, ph_start, humidity_start, start_state, note) {
    return http.post(`${web_api_url}/mixer-block-production`, {plant_id, ph_start, humidity_start, start_state, note});
}

export function put(plant_id, ph_start, humidity_start, start, note) {
    return http.put(`${web_api_url}/mixer-block-production/${plant_id}`, { ph_start, humidity_start, start, note});
}

export function putEnd(plant_id, ph_end, humidity_end, nr_bllokave_demtuar, note) {
    return http.put(`${web_api_url}/mixer-block-production-end/${plant_id}`, {ph_end, humidity_end, nr_bllokave_demtuar, note});
}

export function postEnd(plant_id, ph_end, humidity_end, nr_blocks, nr_bllokave_demtuar, end_state, note) {
    return http.post(`${web_api_url}/mixer-block-production-end`, {plant_id, ph_end, humidity_end, nr_blocks, nr_bllokave_demtuar, end_state, note});
}

export default {
    post,
    put,
    putEnd,
    postEnd
}