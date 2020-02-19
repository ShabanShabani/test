import http from "./httpService";
import { getJwt } from './authService'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

http.setJwt(getJwt());


export async function getUserEmpFullHistory() {
  return await http.get(`${web_api_url}/employment-history`);
}

// export function employment_history(empID,
//     id,
//     job_title,
//     employer_name,
//     star_date,
//     end_date,
//     job_city,
//     job_description,
//     checked,
//   ) {
//     let data = new FormData();
//     data.append("user_id", id);
//     data.append("job_title", job_title);
//     data.append("employer_name", employer_name);
//     data.append("start_date", star_date);
//     data.append("end_date", end_date);
//     data.append("job_city", job_city);
//     data.append("job_description", job_description);
//     data.append("checked", checked);
//     return http.put(
//       `${web_api_url}/employment-history/${empID}`,
//       data,
//       multipartHeader
//     );
// }

// POST
export function employment_history2(id, job_title, employer_name, start_month, end_month, start_year, end_year, job_city, emp_web, job_description, checkboxToggle) {
  return http.post(`${web_api_url}/employment-history`, { id, job_title, employer_name, start_month, end_month, start_year, end_year, job_city, emp_web, job_description, checkboxToggle });
}
//PUT
export function employment_history(empID, id, job_title, employer_name, start_month, end_month, start_year, end_year, job_city, emp_web, job_description, checkboxToggle) {
  return http.put(`${web_api_url}/employment-history/${empID}`, { id, job_title, employer_name, start_month, end_month, start_year, end_year, job_city, emp_web, job_description, checkboxToggle });
}

//DELETE
export function employment_history_delete(empID) {
  return http.delete(`${web_api_url}/employment-history/${empID}`);
}


export default {
  employment_history,
  employment_history2,
  employment_history_delete,
  getUserEmpFullHistory
};