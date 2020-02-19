import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export function add(first_name, last_name, email, password) {
    return http.post(`${web_api_url}/user`, {first_name, last_name, email, password});
}

export function postNotification(id) {
    return http.post(`${web_api_url}/notification/${id}`);
}

export function edit(id, first_name, last_name, email) {
    return http.put(`${web_api_url}/user/${id}`, {first_name, last_name, email});
}

export function editAccess(id, access_dashboard, access_job_report, access_mixer_block_production, access_mixer_block_production_end, access_average_weight_substrates, access_autoclave, access_autoclave_end, access_inoculation_room, access_control_infected_substrates, access_harvesting, access_sort_package, access_temperatures, access_reports, access_stock, access_fridge, access_users) {

    return http.put(`${web_api_url}/user-privileges/${id}`, {access_dashboard, access_job_report, access_mixer_block_production, access_mixer_block_production_end, access_average_weight_substrates, access_autoclave, access_autoclave_end, access_inoculation_room, access_control_infected_substrates, access_harvesting, access_sort_package, access_temperatures, access_reports, access_stock, access_fridge, access_users});
}

export function getAll() {
    return http.get(`${web_api_url}/users`);
}

export function autoUpload(profile_picture) {
    let data = new FormData();

    if (profile_picture) {
        data.append('profile_picture', profile_picture, profile_picture.name);
    }
    return http.put(`${web_api_url}/profile-picture`, data, multipartHeader);
}

export function getCurrentUser(token) {
    return http.get(`${web_api_url}/user`, { token });
}

export function language(language) {
    return http.put(`${web_api_url}/language`, {language});
}

export function getNotification() {
    return http.get(`${web_api_url}/notification`);
}

export default {
    add,
    edit,
    getAll,
    editAccess,
    autoUpload,
    getCurrentUser,
    getNotification,
    language,
    postNotification
}