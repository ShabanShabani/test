import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(plant_id, work_hours, nr_total_ark, weight_bruto, weight_neto, average_harvest_hour_kg, nr_seres, note, histories) {
    return http.post(`${web_api_url}/harvesting`, {plant_id, work_hours, nr_total_ark, weight_bruto, weight_neto, average_harvest_hour_kg, nr_seres, note, histories});
}

export function put(plant_id, work_hours, nr_total_ark, weight_bruto, weight_neto, average_harvest_hour_kg, nr_seres, date, note, histories) {
    return http.put(`${web_api_url}/harvesting/${plant_id}`, { work_hours, nr_total_ark, weight_bruto, weight_neto, average_harvest_hour_kg, nr_seres, date, note, histories});
}

export default {
    post,
    put
}