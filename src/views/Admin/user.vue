<template>
  <div class="container" ref="scrollContainer"  style="max-height: 800px; overflow-y: auto;">
    <h1>用户列表</h1>
    <el-table :data="users" border stripe>
      <el-table-column prop="userId" label="用户ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="头像" width="100">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.picture" :fit="fit" />
        </template>
      </el-table-column>
      <el-table-column prop="telephone" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="status" label="当前状态">
        <template v-slot="scope">
          <span v-if="scope.row.status === 0">未激活</span>
          <span v-else-if="scope.row.status === 1">使用中</span>
          <span v-else-if="scope.row.status === 2">已禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button v-if="scope.row.status === 1" type="danger" size="small" @click="disableUser(scope.row)">
            点击禁用
          </el-button>
          <el-button v-else-if="scope.row.status === 2" type="primary" size="small" @click="activateUser(scope.row)">
            激活账号
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8081/user/all')
        this.users = response.data.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async disableUser(user) {
      try {
        await axios.put(`http://localhost:8081/user/disable?userId=${user.userId}`)
        this.$message.success('当前账号已禁用')
        this.fetchUsers()
      } catch (error) {
        console.error('Error disabling user:', error)
      }
    },
    async activateUser(user) {
      try {
        await axios.put(`http://localhost:8081/user/activate?userId=${user.userId}`)
        this.$message.success('当前账号已激活')
        this.fetchUsers()
      } catch (error) {
        console.error('Error activating user:', error)
      }
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
