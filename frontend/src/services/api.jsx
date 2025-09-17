import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080' 
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('user_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
