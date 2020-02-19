import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(plant_id, inf_green, inf_orange, inf_yellow, inf_black, inf_red, tot_inf_blocks, note) {
    return http.post(`${web_api_url}/control-infected-substrate`, {plant_id, inf_green, inf_orange, inf_yellow, inf_black, inf_red, tot_inf_blocks, note});
}

export function put(id, plant_id, inf_green, inf_orange, inf_yellow, inf_black, inf_red, tot_inf_blocks, date, note) {
    return http.put(`${web_api_url}/control-infected-substrate/${id}`, {plant_id, inf_green, inf_orange, inf_yellow, inf_black, inf_red, tot_inf_blocks, date, note});
}

export default {
    post,
    put
}