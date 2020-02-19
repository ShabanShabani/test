import http from './httpService';
import jwt_decode from 'jwt-decode'

const {
    REACT_APP_WEB_API_URL: web_api_url,
    REACT_APP_TOKEN_NAME: tokenName
} = process.env;

http.setJwt(getJwt())

export function login(email, password) {
    return http.post(`${web_api_url}/login`, { email, password }).then(({ data }) => {
        if (data.access_token) {
            localStorage.setItem(tokenName, data.access_token);
            return {
                success: true
            };
        }
        else {
            return {
                error: "Email ose Password eshe shkruar gabim"
            }
        }
    }).catch(err => {
        let error = "Something went wrong. Please try again";
        if (err.response && err.response.status === 400) {
            error = "Email ose Password eshe shkruar gabim";
        }

        return {
            error: error
        }
    })
}

export function confirmEmailLogin(token) {
    return http.post(`${web_api_url}/confirm-email`, { token }).then(({ data }) => {
        if (data.access_token) {
            localStorage.setItem(tokenName, data.access_token);
            return {
                success: true
            };
        }
        else {
            return {
                error: "Email ose Password eshe shkruar gabim"
            }
        }
    }).catch(err => {
        let error = "Something went wrong. Please try again";
        if (err.response && err.response.status === 400) {
            error = "Email ose Password eshe shkruar gabim";
        }

        return {
            error: error
        }
    })
}

export function logout() {
    localStorage.removeItem(tokenName);
}

export function getJwt() {
    return localStorage.getItem(tokenName)
}

export function getUserName() {
    return getCurrentUser().username;
}

export function getUserId() {
    return getCurrentUser().id;
}

export function getUserEmail() {
    return getCurrentUser().email;
}

export function getInitials() {
    let firstName = getCurrentUser().first_initial;
    let lastName = getCurrentUser().last_initial;

    return firstName + lastName;
}

export function getCurrentUser() {
    try {
        const token = getJwt();
        const decoded = jwt_decode(token);
        if (new Date().getTime() / 1000 > decoded.exp) {
            //expired
            localStorage.removeItem(tokenName);
            return null;
        }
        return decoded.user_claims;
    } catch (ex) {
        return null;
    }
}

export async function forgotPassword(email) {
    return http.post(`${web_api_url}/forgot-password`, {
        email
    });
}

export async function verifyChangePasswordToken(token) {
    return await http.get(`${web_api_url}/verify-token/${token}`);
}

export function changePassowrd(password, token) {
    return http.post(`${web_api_url}/change-password`, { password, token });
}

export async function confirmUser(token) {
    return await http.post(`${web_api_url}/confirm-user`, { token });
}

export default {
    login,
    logout,
    getJwt,
    getCurrentUser,
    forgotPassword,
    verifyChangePasswordToken,
    confirmUser,
    confirmEmailLogin,
    changePassowrd,
    getInitials
}
