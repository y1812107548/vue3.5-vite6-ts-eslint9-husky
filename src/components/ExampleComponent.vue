<template>
  <div class="example-component">
    <h1 class="title">示例组件</h1>
    <div class="content">
      <div class="card">
        <h2 class="card-title">卡片标题</h2>
        <p class="card-text">
          这是一段很长的文本，将会在两行后显示省略号，用来测试文本省略的混入是否正常工作。这是一段很长的文本，将会在两行后显示省略号。
        </p>
      </div>
    </div>
  </div>

  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="created_at" label="创建时间" />
  </el-table>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getUserList } from '@/api/user';

  const tableData = ref<any[]>([]);

  // 组件逻辑
  onMounted(async () => {
    const res = await getUserList();
    tableData.value = res;
  });
</script>

<style lang="scss" scoped>
  .example-component {
    padding: $spacing-base;

    .title {
      color: $primary-color;
      margin-bottom: $spacing-large;
    }

    .content {
      @include flex(column, center, stretch);
      gap: $spacing-base;

      .card {
        background-color: white;
        border: 1px solid $border-color;
        border-radius: 8px;
        padding: $spacing-base;

        @include respond-to('md') {
          max-width: 600px;
          margin: 0 auto;
        }

        .card-title {
          color: $text-primary;
          margin-bottom: $spacing-small;
        }

        .card-text {
          color: $text-regular;
          @include text-ellipsis(2);
        }
      }
    }
  }
</style>
