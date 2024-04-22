<template>
  <div class="header">
    <doctorHeader></doctorHeader>
  </div>
  <div class="container">
    <el-table :data="users" border stripe>
      <el-table-column prop="userId" label="用户ID" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="gender" label="性别" width="70"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="telephone" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="address" label="住址" width="230"></el-table-column>
      <el-table-column  label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="toEMR(scope.row)">
            病例管理
          </el-button>
          <el-button link type="primary" size="small" @click="toPrescription(scope.row)">
            处方管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import doctorHeader from '@/views/doctorLayout/doctorHeader.vue'

export default {
  components: { doctorHeader },
  computed: {
  },
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetchDoctors()
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:8081/user/all')
        this.users = response.data.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    toEMR(users){
      localStorage.setItem('userId', users.userId);
      console.log(users.userId)
      this.$router.push('/doctor/emr')
    },
    toPrescription(users){
      localStorage.setItem('userId', users.userId);
      this.$router.push('/doctor/prescription')
    },
  }
}
</script>

<style scoped>
.container {
  margin: 100px auto;
  max-width: 1000px;
}
</style>
