import http from "./httpService";
// import { getJwt } from './authService'


const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

const multipartHeader = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export function autoUpload(image) {
    let data = new FormData();
    if (image) {
        data.append('image', image, image.name);
    }
    return http.put(`${web_api_url}/post-image`, data, multipartHeader);
}
// PUT

export function createPostPut(id, title, description, image, end_date) {
    return http.put(`${web_api_url}/post/${id}`, { title, description, image, end_date });
}

// POST

export function createPostPost(company_id, title, description, image, end_date) {
    return http.post(`${web_api_url}/post`, { company_id, title, description, image, end_date });
}

export function getAllPosts() {
    return http.get(`${web_api_url}/posts`);
}

export function getJobsScroll(page) {
    return http.post(`${web_api_url}/posts`, { page });
}

export function getCompanyPosts(page) {
    return http.post(`${web_api_url}/posts-company`, { page });
}

export function viewCompanyProfilePosts(id) {
    return http.get(`${web_api_url}/posts-company/${id}`);
}

export function applyNow(id) {
    return http.post(`${web_api_url}/post-apply/${id}`);
}
export function onCancel(id) {
    return http.post(`${web_api_url}/post-cancel/${id}`);
}

export function getClickedPost(id) {
    return http.get(`${web_api_url}/post/${id}`);
}

export function getClickedPostNoUser(id) {
    return http.get(`${web_api_url}/post-no-user/${id}`);
}

export function getClickedPostForUser(id) {
    return http.get(`${web_api_url}/post-for-user/${id}`);
}

export function getPostApplicants(id) {
    return http.post(`${web_api_url}/post-applicants/${id}`);
}

export function getShortApplicants(id) {
    return http.get(`${web_api_url}/short-list/${id}`);
}

export function postShortApplicants(post_id,user_id) {
    return http.post(`${web_api_url}/short-list`, {post_id,user_id});
}

export function removeFromShortList(post_id,user_id) {
    return http.post(`${web_api_url}/remove-list`, {post_id,user_id});
}

export function interviewDate(post_id, user_id, schedule) {
    console.log(schedule)
    schedule = new Date(schedule); 
    schedule.setHours(schedule.getHours() + 1);
    console.log(schedule)
    return http.post(`${web_api_url}/interview`, {post_id, user_id, schedule});
}

export function EditinterviewDate(post_id, user_id, schedule) {
    return http.put(`${web_api_url}/interview`, {post_id, user_id, schedule});
}

export function cancelInterview(post_id, user_id) {
    return http.post(`${web_api_url}/cancel-interview`, {post_id, user_id});
}

export function getInterviewsUsers(post_id) {
    return http.get(`${web_api_url}/interviews/${post_id}` );
}

export function requestReschedule(interviewMessage, postId, userID) {
    return http.post(`${web_api_url}/reschedule`, {interviewMessage, postId, userID});
}



export default {
    autoUpload,
    createPostPost,
    createPostPut,
    getAllPosts,
    getCompanyPosts,
    applyNow,
    onCancel,
    getClickedPost,
    getClickedPostNoUser,
    getPostApplicants,
    getClickedPostForUser,
    viewCompanyProfilePosts,
    getJobsScroll,
    getShortApplicants,
    postShortApplicants,
    removeFromShortList,
    interviewDate,
    getInterviewsUsers,
    EditinterviewDate,
    cancelInterview,
    requestReschedule
};