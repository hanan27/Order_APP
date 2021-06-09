import axios from 'axios';

export const host = 'https://order-plus-bcc7b.firebaseapp.com/api/v1';

let axiosInstance = axios.create({
    baseURL: host
});

axiosInstance.defaults.headers.common = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
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