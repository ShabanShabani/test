import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function post(time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2) {
    return http.post(`${web_api_url}/temperature-cultivation`, {time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2});
}

export function put(id, time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2) {
    return http.put(`${web_api_url}/temperature-cultivation/${id}`, { id, time, green_house_id, temperature, block_temperature_entry, block_temperature_middle, block_temperature_exit, humidity, display_co2, entry_co2, middle_co2, exit_co2});
}


export function get() {
    return http.get(`${web_api_url}/temperature-cultivation`);
}

export function postGrowing(time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2) {
    return http.post(`${web_api_url}/temperature-growing`, {time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2});
}

export function putGrowing(id, time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2) {
    return http.put(`${web_api_url}/temperature-growing/${id}`, { time, green_house_id, temperature1, temperature2, temperature3, temperature4, temperature_block_entry, temperature_block_middle, temperature_block_exit, middle_co2});
}


export function getGrowing() {
    return http.get(`${web_api_url}/temperature-growing`);
}

export function getLive() {
    return http.get(`${web_api_url}/live-data`);
}

export function getLiveImage() {
    return http.get(`${web_api_url}/live-data-1`);
}

export function getAvgDays() {
    return http.get(`${web_api_url}/green-house-days`);
}

export function getAvgShelfs() {
    return http.get(`${web_api_url}/shelf-average`);
}

export function getFilterDateCultivation(filter_date, filter_date_to) {
    return http.post(`${web_api_url}/cultivation-filter`, {filter_date, filter_date_to});
}

export function getFilterDateGrowing(filter_date, filter_date_to) {
    return http.post(`${web_api_url}/growing-filter`, {filter_date, filter_date_to});
}


export default {
    post,
    put,
    get,
    postGrowing,
    putGrowing,
    getGrowing,
    getLive,
    getLiveImage,
    getAvgDays,
    getFilterDateCultivation,
    getFilterDateGrowing,
    getAvgShelfs
}