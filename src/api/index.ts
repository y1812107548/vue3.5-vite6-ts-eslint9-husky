import request from '@/utils/request';

export const login = (data: { username: string; password: string; email: string }) => {
  return request.post<UserInfo>('/api/user/login', data);
};

export const register = (data: { username: string; password: string; email: string }) => {
  return request.post('/api/user/register', data);
};

export const logout = () => {
  return request.post('/api/user/logout');
};
