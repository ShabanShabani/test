import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

http.setJwt(getJwt());
                    
export async function getSearch(skillsFilterValue, languageFilter, educationFilter, experienceFilter, drivingLicense, toggleCompany, search, page) {
    return http.post(`${web_api_url}/users-filter`, { skillsFilterValue, languageFilter, educationFilter, experienceFilter, drivingLicense, toggleCompany, search, page });
}

export async function getFitlerSearch(search, page) {
    return http.post(`${web_api_url}/posts-filtered`, { search, page });
}

export async function getFitlerUsersSearch(search) {
    return http.post(`${web_api_url}/users-search`, { search });
}

export async function getFitlerCompanySearch(search) {
    return http.post(`${web_api_url}/companies-search`, { search });
}
export async function getCandidatesNotesSearch(search) {
    return http.post(`${web_api_url}/notes-search`, { search });
}


export default {
    getSearch,
    getCandidatesNotesSearch,
    getFitlerCompanySearch,
    getFitlerSearch,
    getFitlerUsersSearch
};