import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

async function get(route: string, params: any) {
    let query = Object.keys(params).length > 0 ?
        "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&')
        : "";
    return axios.get(BASE_URL + route + query);
}

async function post(route: string, params: any) {
    let body = JSON.stringify(params);
    return axios.post(BASE_URL + route, `body=${body}`, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    });
}

const api = { get, post };

export default api;