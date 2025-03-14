import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'chat',
    name: 'Chat',
    component: () => import('@/views/chat/index.vue'),
    meta: {
      title: '聊天',
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];
