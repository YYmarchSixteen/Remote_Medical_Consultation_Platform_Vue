<template>
  <div class="container">
    <h1>个人中心</h1>
    <div v-if="user">
      <el-form :model="user" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="user.telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUser">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-alert
        title="正在加载用户信息..."
        type="info"
        show-icon
      ></el-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user:{},
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
         const response = await axios.get('http://localhost:8081/admin/id1')
         this.user = response.data.data
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    async updateUser() {
      try {
        const params = new URLSearchParams()
        params.append('adminId', this.user.adminId)
        params.append('password', this.user.password)
        params.append('telephone', this.user.telephone)
        await axios.put('http://localhost:8081/admin/update', params)
        alert('用户信息已更新')
      } catch (error) {
        console.error('Error updating user:', error)
        alert('更新用户信息时出错')
      }
    },
    re(){
      window.location.reload();
    },
  }
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  max-width: 800px;
}
</style>
