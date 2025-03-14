<template>
  <div class="user-container">
    <div class="header">
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
    </div>

    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="created_at" label="创建时间" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="500px">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!formData.id">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { getUserList as fetchUserList, createUser, updateUser, deleteUser } from '@/api/user';
  import type { UserData } from '@/api/user';

  type UserForm = UserData;

  const users = ref<UserForm[]>([]);
  const dialogVisible = ref(false);
  const dialogTitle = ref('');
  const formRef = ref<FormInstance>();

  const formData = ref<UserForm>({
    username: '',
    email: '',
    password: '',
  });

  const rules: FormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
    ],
  };

  // 获取用户列表
  const loadUserList = async () => {
    const response = await fetchUserList();
    users.value = response || [];
  };

  // 新增用户
  const handleAdd = () => {
    dialogTitle.value = '新增用户';
    formData.value = {
      username: '',
      email: '',
      password: '',
    };
    dialogVisible.value = true;
  };

  // 编辑用户
  const handleEdit = (row: UserForm) => {
    dialogTitle.value = '编辑用户';
    formData.value = { ...row };
    dialogVisible.value = true;
  };

  // 删除用户
  const handleDelete = async (row: UserForm) => {
    try {
      await ElMessageBox.confirm('确认删除该用户吗？', '提示', {
        type: 'warning',
      });
      await deleteUser(row.id!);
      ElMessage.success('删除成功');
      loadUserList();
    } catch (error) {
      if (error !== 'cancel') {
        ElMessage.error('删除失败');
      }
    }
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return;

    await formRef.value.validate(async valid => {
      if (valid) {
        try {
          if (formData.value.id) {
            await updateUser(formData.value.id, formData.value);
          } else {
            await createUser(formData.value);
          }
          ElMessage.success(formData.value.id ? '更新成功' : '新增成功');
          dialogVisible.value = false;
          loadUserList();
        } catch (error) {
          ElMessage.error(formData.value.id ? '更新失败' : '新增失败');
        }
      }
    });
  };

  onMounted(() => {
    loadUserList();
  });
</script>

<style scoped>
  .user-container {
    padding: 20px;
  }

  .header {
    margin-bottom: 20px;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
</style>
