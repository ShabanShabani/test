import http from './httpService';

export async function getCurrentWeather() {
    return http.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/389674dc955f9792a3ac3902e701cd38/42.876563, 20.838131?exclude=hourly,flags,alerts,offset&units=auto',{ useCredentails: true });
}

export default {
    getCurrentWeather
}