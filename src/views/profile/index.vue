<template>
  <div class="profile">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
          <el-button type="primary" size="small">编辑</el-button>
        </div>
      </template>
      <div class="profile-info">
        <el-avatar
          :size="100"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <div class="info-list">
          <el-descriptions :column="1">
            <el-descriptions-item label="用户名">张三</el-descriptions-item>
            <el-descriptions-item label="邮箱">zhangsan@example.com</el-descriptions-item>
            <el-descriptions-item label="手机">13800138000</el-descriptions-item>
            <el-descriptions-item label="职位">前端开发工程师</el-descriptions-item>
            <el-descriptions-item label="所在地">北京市</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
  .profile {
    padding: 20px;
  }

  .profile-card {
    max-width: 800px;
    margin: 0 auto;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .profile-info {
    display: flex;
    gap: 40px;
    padding: 20px;
  }

  .info-list {
    flex: 1;
  }
</style>
