import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;


export function post(plant_id, substrate1,substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9, pesha_mesatare, note) {
    return http.post(`${web_api_url}/average-weight-substrate`, {plant_id, substrate1,substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9, pesha_mesatare, note});
}

export function put(plant_id, substrate1,substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9, pesha_mesatare, date, note) {
    return http.put(`${web_api_url}/average-weight-substrate/${plant_id}`, { substrate1,substrate2, substrate3, substrate4, substrate5, substrate6, substrate7, substrate8, substrate9, pesha_mesatare, date, note});
}

export default {
    post,
    put
}