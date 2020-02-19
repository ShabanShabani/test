import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
  headers: {
    "content-type": "multipart/form-data"
  }
};

http.setJwt(getJwt());

export function language_history(id, language, level) {
  let data = new FormData();
  data.append("language", language);
  data.append("level", level);
  return http.put(
    `${web_api_url}/language/${id}`,
    data,
    multipartHeader
  );
}

export function language_history2(id, language, level) {
  let data = new FormData();
  data.append("user_id", id);
  data.append("language", language);
  data.append("level", level);
  return http.post(`${web_api_url}/language`, data, multipartHeader);
}

export function language_history_delete(internshipID) {
  return http.delete(`${web_api_url}/language/${internshipID}`);
}

export async function getUserLanguagesFullHistory() {
  return await http.get(`${web_api_url}/languages`);
}

export default {
  language_history,
  language_history2,
  language_history_delete,
  getUserLanguagesFullHistory
};