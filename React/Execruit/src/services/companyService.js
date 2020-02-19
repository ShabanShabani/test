import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export function add(name, email, password) {
    return http.post(`${web_api_url}/company`, { name, email, password });
}

export function getAll() {
    return http.get(`${web_api_url}/companies`);
}

export function autoUpload(profile_picture) {
    let data = new FormData();
    if (profile_picture) {
        data.append('profile_picture', profile_picture, profile_picture.name);
    }
    return http.put(`${web_api_url}/profile-picture-company`, data, multipartHeader);
}

export function getCurrentCompany() {
    return http.get(`${web_api_url}/company`);
}

export function getUserCompany(id) {
    return http.get(`${web_api_url}/company/${id}`);
}

export async function putFavorites(favorite, isActive) {
    return await http.put(`${web_api_url}/put-fav-company`, { favorite, isActive });
}

export async function getFavorites() {
    return await http.get(`${web_api_url}/favorites-id`);
}

export async function getFavoriteUsers() {
    return await http.get(`${web_api_url}/favorite-users`);
}

export async function getNotesUsers() {
    return await http.get(`${web_api_url}/noted-users`);
}

export function edit(nui, name, phone_number, industry, location, country, city, address, postal_code, summary) {
    return http.put(`${web_api_url}/company`, { nui, name, phone_number, industry, location, country, city, address, postal_code, summary });
}

export async function getSocialLink() {
    return await http.get(`${web_api_url}/social-link-company`);
}


export function putSocialLink(socialId, socialWeb, socialLink, socialImage) {
    let data = new FormData();
    data.append("socialWeb", socialWeb);
    data.append("socialLink", socialLink);
    data.append("socialImage", socialImage);
    return http.put(`${web_api_url}/social-link-company/${socialId}`, data);
}

export function postSocialLink(socialWeb, socialLink, socialImage) {
    let data = new FormData();
    data.append("socialWeb", socialWeb);
    data.append("socialLink", socialLink);
    data.append("socialImage", socialImage);
    return http.post(`${web_api_url}/social-link-company`, data);
}

export function deleteSocialLink(socialId) {
    return http.delete(`${web_api_url}/social-link-company/${socialId}`);
}


export default {
    add,
    edit,
    getAll,
    autoUpload,
    getCurrentCompany,
    putFavorites,
    getFavorites,
    getFavoriteUsers,
    getSocialLink,
    putSocialLink,
    postSocialLink,
    deleteSocialLink,
    getUserCompany,
    getNotesUsers
}