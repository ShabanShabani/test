import http from "./httpService";

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export async function getSocialLink() {
    return await http.get(`${web_api_url}/social-link`);
}

export function putSocialLink(socialId, userId, socialWeb, socialLink, socialImage) {
    let data = new FormData();
    data.append("user_id", userId);
    data.append("socialWeb", socialWeb);
    data.append("socialLink", socialLink);
    data.append("socialImage", socialImage);
    return http.put(`${web_api_url}/social-link/${socialId}`, data, multipartHeader);
}

export function postSocialLink(userId, socialWeb, socialLink, socialImage) {
    let data = new FormData();
    data.append("user_id", userId);
    data.append("socialWeb", socialWeb);
    data.append("socialLink", socialLink);
    data.append("socialImage", socialImage);
    return http.post(`${web_api_url}/social-link`, data, multipartHeader);
}

export function deleteSocialLink(socialId) {
    return http.delete(`${web_api_url}/social-link/${socialId}`);
}

export default {
    getSocialLink,
    putSocialLink,
    postSocialLink,
    deleteSocialLink
};