import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';

// 自动导入所有模块路由（排除登录和错误页面）
const modules = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/auth.ts', '!./modules/error.ts'],
  { eager: true },
);

const asyncRoutes: RouteRecordRaw[] = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key] as any;
  const modList = Object.values(mod)[0] as RouteRecordRaw[];
  asyncRoutes.push(...modList);
});

// 静态路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: '首页',
    },
    component: () => import('@/components/SideBar.vue'),
    children: [...asyncRoutes],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

console.log(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path !== '/login' && !userStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
