import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

http.setJwt(getJwt());


// InternshipForm Requests
//  PUT

// export function internship_history(
//     internshipID,
//     id,
//     title,
//     organisation,
//     star_date,
//     end_date,
//     city,
//     country,
//     description
//   ) {
//     let data = new FormData();
//     data.append("user_id", id);
//     data.append("title", title);
//     data.append("organisation", organisation);
//     data.append("start_date", star_date);
//     data.append("end_date", end_date);
//     data.append("city", city);
//     data.append("country", country);
//     data.append("description", description);
//     return http.put(
//       `${web_api_url}/internship/${internshipID}`,
//       data,
//       multipartHeader
//     );
//   }

// PUT
export function internship_history(internshipID, id, title, organisation, start_month, end_month, start_year, end_year, city, country, description, checkboxToggle) {
  return http.put(`${web_api_url}/internship/${internshipID}`, { id, title, organisation, start_month, end_month, start_year, end_year, city, country, description, checkboxToggle });
}

// POST
export function internship_history2(id, title, organisation, start_month, end_month, start_year, end_year, city, country, description, checkboxToggle) {
  return http.post(`${web_api_url}/internship`, { id, title, organisation, start_month, end_month, start_year, end_year, city, country, description, checkboxToggle });
}

//DELETE

export function internship_history_delete(internshipID) {
  return http.delete(`${web_api_url}/internship/${internshipID}`);
}

// Get
export async function getUserinternshipsFullHistory() {
  return await http.get(`${web_api_url}/internships`);
}

export default {
  internship_history,
  internship_history2,
  internship_history_delete,
  getUserinternshipsFullHistory,
};