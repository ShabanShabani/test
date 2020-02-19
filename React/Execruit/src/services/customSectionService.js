import http from "./httpService";

const { REACT_APP_WEB_API_URL: web_api_url, REACT_APP_TOKEN_NAME: tokenName } = process.env;

http.setJwt(getJwt());

export function getJwt() {
    return localStorage.getItem(tokenName)
}

// ReferencesForm Requests

// GET

export async function getUserCustomSectionFullHistory() {
    return await http.get(`${web_api_url}/customs`);
}

//  PUT

export function custom_history(cusID, id, custom_options, activity_name, city, start_month, end_month, start_year, end_year, description, show_input_field, checkboxToggle) {
    return http.put(`${web_api_url}/custom/${cusID}`, { id, custom_options, activity_name, city, start_month, end_month, start_year, end_year, description, show_input_field, checkboxToggle });
}

// POST
export function custom_history2(id, custom_options, activity_name, city, start_month, end_month, start_year, end_year, description, show_input_field, checkboxToggle) {
    return http.post(`${web_api_url}/custom`, { id, custom_options, activity_name, city, start_month, end_month, start_year, end_year, description, show_input_field, checkboxToggle });
}

//DELETE

export function custom_history_delete(cusID) {
    return http.delete(`${web_api_url}/custom/${cusID}`);
}


export default {
    custom_history,
    custom_history2,
    custom_history_delete,
    getUserCustomSectionFullHistory
};