<template>
  <div class="header">
    <doctorHeader></doctorHeader>
  </div>
  <div class="container">
    <!-- 添加筛选框 -->
    <el-select v-model="filter" placeholder="请选择筛选条件" style="margin-bottom: 20px;">
      <el-option label="全部预约" value="all"></el-option>
      <el-option label="未完成预约" value="unfinished"></el-option>
      <el-option label="已完成预约" value="finished"></el-option>
    </el-select>

    <!-- 表格内容 -->
    <el-table :data="filteredUsers" border stripe>
      <el-table-column prop="user_name" label="用户名"></el-table-column>
      <el-table-column prop="reserveTime" label="预约日期"></el-table-column>
      <el-table-column prop="sequence" label="时间">
        <template v-slot="scope">
          <span v-if="scope.row.sequence === '1'">8:00</span>
          <span v-if="scope.row.sequence === '2'">8:15</span>
          <span v-if="scope.row.sequence === '3'">8:30</span>
          <span v-if="scope.row.sequence === '4'">8:45</span>
          <span v-if="scope.row.sequence === '5'">9:00</span>
          <span v-if="scope.row.sequence === '6'">9:15</span>
          <span v-if="scope.row.sequence === '7'">9:30</span>
          <span v-if="scope.row.sequence === '8'">9:45</span>
          <span v-if="scope.row.sequence === '9'">10:00</span>
          <span v-if="scope.row.sequence === '10'">10:15</span>
          <span v-if="scope.row.sequence === '11'">10:30</span>
          <span v-if="scope.row.sequence === '12'">10:45</span>
          <span v-if="scope.row.sequence === '13'">11:00</span>
          <span v-if="scope.row.sequence === '14'">11:15</span>
          <span v-if="scope.row.sequence === '15'">11:30</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <span v-if="scope.row.status === '1'">未处理</span>
          <span v-else>已处理</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <span v-if="scope.row.status === '1'">
            <el-button link type="text" @click="detail(scope.row)">
              去处理
            </el-button>
          </span>
          <span v-else>
            <el-button link type="text" plain disabled>
              已完成
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import doctorHeader from '@/views/doctorLayout/doctorHeader.vue'
import router from '@/router'

export default {
  components: { doctorHeader },
  data() {
    return {
      users: [],
      filter: 'unfinished'
    }
  },
  computed: {
    filteredUsers() {
      switch (this.filter) {
        case 'all':
          return this.users
        case 'unfinished':
          return this.users.filter(user => user.status === '1')
        case 'finished':
          return this.users.filter(user => user.status === '2')
        default:
          return this.users
      }
    }
  },
  mounted() {
    this.fetchDoctors()
    sessionStorage.getItem('doctorId')
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:8081/reserve/doctorReserve?doctorId=1')
        this.users = response.data.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async detail(filteredUsers) {
      try {
        const params = new URLSearchParams()
        params.append('userId', filteredUsers.userId)
        params.append('doctorId', sessionStorage.getItem('doctorId'))
        params.append('message', '您好我是您预约的医生，很高兴能与您进行在线问诊。请问您感觉如何？有什么问题或症状需要我帮助解决吗？')
        console.log(filteredUsers.userId)
        await axios.post('http://localhost:8081/chat/doctorSend', params)
        await router.push('/doctor/message')
      } catch (error) {
        alert('请稍后重试')
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin: 100px auto;
  max-width: 1000px;
}
</style>
