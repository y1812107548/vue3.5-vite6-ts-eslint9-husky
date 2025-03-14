import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];
