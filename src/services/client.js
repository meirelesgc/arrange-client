import axios from 'axios';
import { getToken } from './auth'

const baseURL = import.meta.env.VITE_API_URL;

export const client = axios.create({
    baseURL: baseURL, headers: { 'Content-Type': 'application/json' }
});

client.interceptors.request.use(config => {
    const token = getToken()
    if (token) { config.headers.Authorization = `Bearer ${token}` }
    return config
})