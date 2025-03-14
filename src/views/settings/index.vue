<template>
  <div class="settings">
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>
      <el-form :model="form" label-width="120px">
        <el-form-item label="系统主题">
          <el-radio-group v-model="form.theme">
            <el-radio value="light">浅色</el-radio>
            <el-radio value="dark">深色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系统语言">
          <el-select v-model="form.language">
            <el-option label="简体中文" value="zh-CN" />
            <el-option label="English" value="en-US" />
          </el-select>
        </el-form-item>
        <el-form-item label="消息通知">
          <el-switch v-model="form.notifications" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSettings">保存设置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { ElMessage } from 'element-plus';

  const form = reactive({
    theme: 'light',
    language: 'zh-CN',
    notifications: true,
  });

  const saveSettings = () => {
    ElMessage.success('设置保存成功');
  };
</script>

<style scoped>
  .settings {
    padding: 20px;
  }

  .settings-card {
    max-width: 800px;
    margin: 0 auto;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
