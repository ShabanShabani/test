import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

http.setJwt(getJwt());

// EducationForm Requests

export async function getUserEducationFullHistory() {
  return await http.get(`${web_api_url}/education-history`);
}

//  PUT

export function education_history(empID, id, school_name, degree, start_month, end_month, start_year, end_year, city, country, edu_web, education_description, major, show_input_field, checkboxToggle) {
  return http.put(`${web_api_url}/education-history/${empID}`, { id, school_name, degree, start_month, end_month, start_year, end_year, city, country, edu_web, education_description, major, show_input_field, checkboxToggle });
}

// POST
export function education_history2(id, school_name, degree, start_month, end_month, start_year, end_year, city, country, edu_web, education_description, major, show_input_field, checkboxToggle) {
  return http.post(`${web_api_url}/education-history`, { id, school_name, degree, start_month, end_month, start_year, end_year, city, country, edu_web, education_description, major, show_input_field, checkboxToggle });
}

//DELETE

export function education_history_delete(empID) {
  return http.delete(`${web_api_url}/education-history/${empID}`);
}

export default {
  education_history,
  education_history2,
  education_history_delete,
  getUserEducationFullHistory,
};