<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>访问量</span>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="1234">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  今日访问
                  <el-icon style="margin-left: 4px">
                    <TrendCharts />
                  </el-icon>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>用户数</span>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="789">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  活跃用户
                  <el-icon style="margin-left: 4px">
                    <User />
                  </el-icon>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>订单量</span>
            </div>
          </template>
          <div class="card-content">
            <el-statistic :value="456">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  今日订单
                  <el-icon style="margin-left: 4px">
                    <ShoppingCart />
                  </el-icon>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { TrendCharts, User, ShoppingCart } from '@element-plus/icons-vue';
</script>

<style scoped>
  .dashboard {
    padding: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-content {
    text-align: center;
  }
</style>
