import http from "./httpService";

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;



export function getFirstChart() {
    return http.get(`${web_api_url}/get-edu`);
}

export function getSecondChart() {
    return http.get(`${web_api_url}/get-exp`);
}

export function getThirdChart() {
    return http.get(`${web_api_url}/get-skills`);
}

export function getFourthChart() {
    return http.get(`${web_api_url}/get-birthdate`);
}

export default {
    getFirstChart,
    getSecondChart,
    getThirdChart,
    getFourthChart
};