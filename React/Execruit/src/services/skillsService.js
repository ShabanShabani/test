import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
  headers: {
    "content-type": "multipart/form-data"
  }
};

http.setJwt(getJwt());

export async function getSkills() {
  return await http.get(`${web_api_url}/skills`);
}

export function addSkills(id, value) {
  return http.put(`${web_api_url}/skills`, { value });
}

export function skill(value) {
  let data = new FormData();
  data.append("value", value);
  return http.post(`${web_api_url}/skill`, data, multipartHeader);
}

export default {
  skill,
  getSkills,
  addSkills,
};