import http from "./httpService";

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;



// PUT

export function putNote(userId, notes, section) {
    return http.put(`${web_api_url}/note`, { userId, notes, section });
}

// POST

export function postNote(id, notes) {
    return http.post(`${web_api_url}/note`, { id, notes });
}

export function getNotes(id) {
    return http.get(`${web_api_url}/notes/${id}`);
}

export default {
    putNote,
    postNote,
    getNotes
};