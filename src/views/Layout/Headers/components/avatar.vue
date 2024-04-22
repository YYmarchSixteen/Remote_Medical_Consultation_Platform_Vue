<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="circleUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const circleUrl = ref(
  'https://tse3-mm.cn.bing.net/th/id/OIP-C.chxdlKIXEmhjvB6Oe5qooAHaHU?w=204&h=202&c=7&r=0&o=5&pid=1.7'
)
const logout =()=>{
    router.replace('/'), ElMessage({
              message: '已退出！',
              type: 'success'
            })
}
</script>

<style lang="scss" scoped></style>
