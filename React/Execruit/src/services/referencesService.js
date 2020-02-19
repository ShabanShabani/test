import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        "content-type": "multipart/form-data"
    }
};

http.setJwt(getJwt());

// GET
export async function getUserReferencesFullHistory() {
    return await http.get(`${web_api_url}/references`);
}

//  PUT

export function references_history(refID, id, full_name, organisation, phone, email, file) {
    let data = new FormData();
    data.append("user_id", id);
    data.append("full_name", full_name);
    data.append("organisation", organisation);
    data.append("phone", phone);
    data.append("email", email);
    if (file){
        data.append("file", file, file.name);
    }
    return http.put(`${web_api_url}/reference/${refID}`,data,multipartHeader);
}

// POST
export function references_history2(id, full_name, organisation, phone, email, file) {
    let data = new FormData();
    data.append("user_id", id);
    data.append("full_name", full_name);
    data.append("organisation", organisation);
    data.append("phone", phone);
    data.append("email", email);
    if (file)
        data.append("file", file, file.name);
    return http.post(`${web_api_url}/reference`, data, multipartHeader);
}

//DELETE

export function references_history_delete(refID) {
    return http.delete(`${web_api_url}/reference/${refID}`);
}


export default {
    references_history,
    references_history2,
    references_history_delete,
    getUserReferencesFullHistory
};