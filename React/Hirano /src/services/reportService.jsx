import http from './httpService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

export function getRaportiMujor(month, year) {
    return http.get(`${web_api_url}/month-report/${month}/${year}`);
}

export function getRaportiKontrollues(month, year) {
    return http.get(`${web_api_url}/control-report/${month}/${year}`);
}

export function getRaportiSerave(month, year) {
    return http.get(`${web_api_url}/green-house-report/${month}/${year}`);
}

export function getRaportiKorrjes(month, year) {
    return http.get(`${web_api_url}/harvesting-report/${month}/${year}`);
}

export function getRaportiPaketimit(month, year) {
    return http.get(`${web_api_url}/packing-report/${month}/${year}`);
}

export function getRaportiSubstrateve(month, year) {
    return http.get(`${web_api_url}/substrate-report/${month}/${year}`);
}

export function getRaportiMiksimit(month, year) {
    return http.get(`${web_api_url}/mix-report/${month}/${year}`);
}

export function getRaportiStoku(month, year) {
    return http.get(`${web_api_url}/stock-report/${month}/${year}`);
}

export function getRaportiFrizit(month, year) {
    return http.get(`${web_api_url}/fridge-report/${month}/${year}`);
}

export function getRaportiPuntoreveKorrje(month, year) {
    return http.get(`${web_api_url}/employee-harvesting/${month}/${year}`);
}

export function getRaportiPuntoreveSort(month, year) {
    return http.get(`${web_api_url}/employee-sort/${month}/${year}`);
}

export default {
    getRaportiMujor,
    getRaportiKontrollues,
    getRaportiSerave,
    getRaportiKorrjes,
    getRaportiPaketimit,
    getRaportiSubstrateve,
    getRaportiMiksimit,
    getRaportiStoku,
    getRaportiFrizit,
    getRaportiPuntoreveKorrje,
    getRaportiPuntoreveSort
}