import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function get() {
    return http.get(`${web_api_url}/activities`);
}

export function getLastActivities() {
    return http.get(`${web_api_url}/last-activities`);
}

export default {
    get,
    getLastActivities
}