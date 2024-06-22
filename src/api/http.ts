// http.ts
import axios from 'axios';

const http = axios.create({
    baseURL: '/api',
    timeout: 3000,
    // 可以根据需要添加额外配置
});

// 请求拦截器
http.interceptors.request.use(config => {
    // 可以在这里添加例如token等请求头
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(response => {
    // 对响应数据做处理，例如只返回data部分
    return response.data;
}, error => {
    // 对响应错误做处理
    return Promise.reject(error);
});

export default http;