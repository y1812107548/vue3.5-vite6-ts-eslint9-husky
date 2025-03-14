<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
  import type { Component } from 'vue';

  const router = useRouter();
  const route = useRoute();

  // 获取所有可显示的路由
  const menuRoutes = computed(() => {
    return router
      .getRoutes()
      .filter(route => {
        // 过滤掉登录、404等特殊路由
        return (
          !['Login', '404', 'NotFound'].includes(route.name as string) &&
          route.meta?.title && // 必须有标题
          !route.path.includes('*') && // 排除通配符路由
          route.path !== '/'
        ); // 排除根路由重定向
      })
      .sort((a, b) => {
        const orderA = (a.meta?.order as number) || 0;
        const orderB = (b.meta?.order as number) || 0;
        return orderA - orderB;
      });
  });

  // 当前激活的菜单项
  const activeIndex = computed(() => route.path);

  const handleSelect = (path: string) => {
    router.push(path);
  };

  // 图标映射
  const iconMap: Record<string, Component> = {
    dashboard: Document,
    profile: Location,
    settings: Setting,
    default: Document,
  };

  const getIcon = (routeName: string): Component => {
    const key = routeName.toLowerCase();
    return iconMap[key] || iconMap['default'];
  };
</script>

<template>
  <div class="sidebar-container">
    <el-menu class="sidebar-menu" :default-active="activeIndex" @select="handleSelect" router>
      <el-menu-item v-for="route in menuRoutes" :key="route.path" :index="route.path">
        <el-icon>
          <component :is="getIcon(route.name as string)" />
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </el-menu>
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .sidebar-menu {
    height: 100vh;
    border-right: solid 1px #e6e6e6;
  }

  .sidebar-menu:not(.el-menu--collapse) {
    width: 200px;
  }

  .sidebar-container {
    display: flex;
  }

  .main-content {
    flex: 1;
    background-color: #f5f7fa;
  }

  // slide-leave-active

  .slide-enter-active {
    transition: all 0.3s ease-in-out;
  }

  .slide-enter-from {
    opacity: 0;
    transform: translateX(50px);
  }

  // .slide-leave-to {
  //   opacity: 1;
  //   transform: translateX(0px);
  // }
</style>
