import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        "content-type": "multipart/form-data"
    }
};

http.setJwt(getJwt());

export function aboutYouEdit(id, firstName, lastName, email, phoneNumber, birthday, country, city, address, postal_code, privacy) {
    let data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber);
    data.append("birthday", birthday);
    data.append("country", country);
    data.append("city", city);
    data.append("address", address);
    data.append("postal_code", postal_code);
    data.append("privacy", privacy);
    return http.put(`${web_api_url}/about-you-edit`, data, multipartHeader);
}

export function autoUpload(profile_pic) {
    let data = new FormData();
    if (profile_pic) {
        data.append("profile_pic", profile_pic, profile_pic.name);
    }
    return http.put(
        `${web_api_url}/profile-picture`,
        data,
        multipartHeader
    );
}

export default {
    aboutYouEdit,
    autoUpload
};