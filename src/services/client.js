import axios from 'axios';
import { message } from 'antd';
import { getToken, removeToken } from './auth';

const baseURL = import.meta.env.VITE_API_URL;

export const client = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' }
});

client.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            message.error('Você precisa fazer login para acessar este recurso.');
            removeToken();
        }
        return Promise.reject(error);
    }
);
