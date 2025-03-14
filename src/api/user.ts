import request from '@/utils/request';

export interface UserData {
  id?: number;
  username: string;
  email: string;
  password?: string;
  createTime?: string;
}

// 获取用户列表
export function getUserList() {
  return request.get('/api/user');
}

// 创建用户
export function createUser(data: UserData) {
  return request.post('/api/user', data);
}

// 更新用户
export function updateUser(id: number, data: UserData) {
  return request.put(`/api/user/${id}`, data);
}

// 删除用户
export function deleteUser(id: number) {
  return request.delete(`/api/user/${id}`);
}
