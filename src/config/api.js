import axios from 'axios';
import vars from "../utils/vars";

export const host = __DEV__ ? vars.host + '/api/v2' : vars.host + '/api/v2';

const AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcHAiLCJhcHAiOjIxMiwiYnVzIjpudWxsLCJjb21wIjpudWxsLCJzY3J0IjoiWUlYTUxBIn0.d_zhMpU-wzZ590mRQ9e_zVRgKkBdC5Q5dhOxk2B1Hw0"
const X_business = "_567adg37"

let axiosInstance = axios.create({
    baseURL: host
});

axiosInstance.defaults.headers.common = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + AUTH_TOKEN,
    'X-business': X_business,
};


axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;