import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ResponseData, RequestOptions } from '@/types/request';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  // 使用环境变量中的接口基础路径
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    ElMessage.error('请求发送失败，请检查网络连接');
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const { code, data, message } = response.data;

    // 这里可以根据后端的约定判断业务状态码
    if (code === 200) {
      return data;
    }

    // 处理其他状态码
    switch (code) {
      case 401:
        // 未登录或 token 过期
        ElMessage.error('登录已过期，请重新登录');
        // 可以在这里处理登出逻辑
        break;
      case 403:
        // 无权限
        ElMessage.error('您没有权限访问该资源');
        break;
      default:
        // 其他错误
        ElMessage.error(message || '请求失败');
    }

    return Promise.reject(new Error(message || '请求失败'));
  },
  error => {
    // 处理 HTTP 错误状态
    let message = '网络错误';
    if (error.response) {
      switch (error.response.status) {
        case 404:
          message = '请求的资源不存在';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        default:
          message = `请求失败: ${error.message}`;
      }
    }

    ElMessage.error(message);
    return Promise.reject(error);
  },
);

// 封装请求方法
const request = {
  get<T = any>(url: string, params?: any, options?: RequestOptions): Promise<T> {
    return service.get(url, { params });
  },

  post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return service.post(url, data);
  },

  put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return service.put(url, data);
  },

  delete<T = any>(url: string, params?: any, options?: RequestOptions): Promise<T> {
    return service.delete(url, { params });
  },
};

export default request;
