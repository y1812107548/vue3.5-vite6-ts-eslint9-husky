<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <h2>欢迎登录</h2>
      </div>
      <div class="login-form">
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
              @keydown.enter="handleLogin"
            />
          </el-form-item>
          <div class="remember-forgot">
            <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
          <el-button type="primary" class="login-button" @click="handleLogin"> 登录 </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/modules/user';
  import { User, Lock } from '@element-plus/icons-vue';
  import { login as loginApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import * as bcrypt from 'bcryptjs';

  const router = useRouter();
  const userStore = useUserStore();
  const loginFormRef = ref<FormInstance>();

  const loginForm = reactive({
    username: '',
    password: '',
    remember: false,
  });

  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    ],
  });

  const handleLogin = () => {
    if (!loginFormRef.value) return;
    loginFormRef.value.validate(async valid => {
      if (!valid) return;
      try {
        // 生成salt并加密密码
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(loginForm.password, salt);

        // 对密码进行加密
        const res = await loginApi({
          username: loginForm.username,
          password,
          email: '',
        });

        userStore.setToken(res.token);
        userStore.setUserInfo(res);
        ElMessage.success('登录成功');
        const timer = setTimeout(() => {
          router.push('/');
          clearTimeout(timer);
        }, 500);
      } catch {
        //登录失败
      }
    });
  };
</script>

<style scoped>
  .login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .login-box {
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  }

  .login-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo {
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
  }

  .login-header h2 {
    font-size: 24px;
    color: #333;
    font-weight: 500;
    margin: 0;
  }

  .login-form {
    :deep(.el-input) {
      margin-bottom: 20px;
    }
  }

  .remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .login-button {
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
</style>
