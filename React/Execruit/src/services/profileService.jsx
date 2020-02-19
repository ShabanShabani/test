import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
  headers: {
    "content-type": "multipart/form-data"
  }
};

http.setJwt(getJwt());


export async function getPublicUsers() {
  return await http.get(`${web_api_url}/public-users`);
}

export async function getUsers() {
  return await http.get(`${web_api_url}/users`);
}

export function putFavoriteUser(favorite, isActive) {
  return http.put(`${web_api_url}/put-fav`, { favorite, isActive });
}

export async function getFavoritesUser() {
  return await http.get(`${web_api_url}/favorites`);
}

export async function getFavoriteCompanies() {
  return await http.get(`${web_api_url}/favorite-companies`);
}


export async function getCurrentUser() {
  return await http.get(`${web_api_url}/user`);
}

export async function getUserEdit(id) {
  return await http.get(`${web_api_url}/user/${id}`);
}

export function experience_description(id, experience_description) {
  let data = new FormData();
  data.append("experience_description", experience_description);
  return http.put(`${web_api_url}/experience-description`, data, multipartHeader);
}

export default {
  getUsers,
  getPublicUsers,
  getUserEdit,
  experience_description,
  getCurrentUser,
  putFavoriteUser,
  getFavoriteCompanies,
  getFavoritesUser
};
