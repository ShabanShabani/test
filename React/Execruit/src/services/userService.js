import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export function add(user) {
    let data = new FormData();
    data.append('first_name', user.firstName);
    data.append('last_name', user.lastName);
    data.append('userName', user.userName);
    data.append('email', user.email);
    data.append('role', user.role);
    data.append('password', user.password);

    return http.post(`${web_api_url}/user`, data, multipartHeader);
}

export function addCompany(name, nui, email, password) {
    return http.post(`${web_api_url}/company`, { name, nui, email, password });
}

export function postNotification(id) {
    return http.post(`${web_api_url}/notification/${id}`);
}

export function viewAllNotifications() {
    return http.post(`${web_api_url}/notification-all`);
}

export function getCurrentUser(token) {
    return http.get(`${web_api_url}/user`, { token });
}

export function getNotification() {
    return http.get(`${web_api_url}/notification`);
}

export function getInterviewNotification() {
    return http.get(`${web_api_url}/interview-notification`);
}

export function viewAllUsersNotifications() {
    return http.post(`${web_api_url}/user-notification-all`);
}

export default {
    add,
    addCompany,
    viewAllNotifications,
    getNotification,
    postNotification,
    getCurrentUser,
    getInterviewNotification,
    viewAllUsersNotifications
}