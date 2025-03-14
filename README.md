# Vue 3 管理系统模板

## 项目简介

这是一个基于 Vue 3、TypeScript、Vite、Element Plus 的后台管理系统模板，采用最新的前端技术栈，内置了许多开箱即用的功能。

## 技术栈

- 核心框架：Vue 3
- 开发语言：TypeScript
- 构建工具：Vite
- UI 框架：Element Plus
- 状态管理：Pinia
- 路由管理：Vue Router
- HTTP 请求：Axios
- 代码规范：ESLint + Prettier
- Git 提交规范：Commitlint + Husky
- WebSocket：Socket.io-client
- CSS 预处理器：Sass

## 项目特性

- 🚀 使用 Vue 3 + TypeScript 开发，支持 `<script setup>`
- 📦 基于 Vite 构建，开发体验极致
- 🎨 集成 Element Plus，提供完善的组件体系
- 🔐 基于角色的权限管理
- 🌐 动态路由，支持多级菜单
- 💾 Pinia 状态管理，支持持久化
- 🔧 ESLint + Prettier 代码规范
- 📝 Git 提交信息规范化
- 🔌 WebSocket 实时通信支持
- 🎯 自动导入组件和 API
- 📱 响应式设计

## 目录结构

```bash
├── src/
│ ├── api/ # API 接口
│ ├── assets/ # 静态资源
│ ├── components/ # 公共组件
│ ├── router/ # 路由配置
│ ├── stores/ # Pinia 状态管理
│ ├── styles/ # 全局样式
│ ├── types/ # TypeScript 类型定义
│ ├── utils/ # 工具函数
│ └── views/ # 页面组件
├── public/ # 公共静态资源
├── .husky/ # Git hooks
├── .vscode/ # VS Code 配置
└── vite.config.ts # Vite 配置
```

## 主要功能

- 用户认证
- 实时聊天
- 用户管理
- 个人中心
- 系统设置
- 仪表盘

## 开发指南

### 环境要求

- Node.js >= 18.17.1
- pnpm/npm/yarn

### 安装依赖

```bash
pnpm install
```

### 运行项目

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

## Git 提交规范

本项目使用 commitlint 规范提交信息，提交格式如下：

- feat: 新功能
- fix: 修复
- docs: 文档变更
- style: 代码格式
- refactor: 重构
- perf: 性能优化
- test: 增加测试
- chore: 构建过程或辅助工具的变动
- revert: 回退
- build: 打包
- ci: 持续集成

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 13
- Edge >= 88

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)
