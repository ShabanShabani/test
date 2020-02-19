import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(plant_id, ark_mini, ark_small, ark_medium_a, ark_medium_b, ark_big_a, ark_big_b, class_c, dried, mix, tails, other, weight_bruto, weight_neto, note, rate, histories) {
    return http.post(`${web_api_url}/sort-package`, {plant_id, ark_mini, ark_small, ark_medium_a, ark_medium_b, ark_big_a, ark_big_b, class_c, dried, mix, tails, other, weight_bruto, weight_neto, note, rate, histories});
}

export function put(plant_id, ark_mini, ark_small, ark_medium_a, ark_medium_b, ark_big_a, ark_big_b, class_c, dried, mix, tails, other, weight_bruto, weight_neto, date, note, rate, histories) {
    return http.put(`${web_api_url}/sort-package/${plant_id}`, { ark_mini, ark_small, ark_medium_a, ark_medium_b, ark_big_a, ark_big_b, class_c, dried, mix, tails, other, weight_bruto, weight_neto, date, note, rate, histories});
}

export default {
    post,
    put
}