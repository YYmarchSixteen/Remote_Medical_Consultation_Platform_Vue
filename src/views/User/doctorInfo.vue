<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="form">
      <div class="form-item">
        <label>头像</label>
        <img :src="doctor.picture"  alt="" style="width: 300px; height: auto;">
      </div>
      <div class="form-item">
        <label>姓名</label>
        <div class="info">{{ doctor.username }}</div>
      </div>
      <div class="form-item">
        <label>科室</label>
        <div class="info">{{ doctor.department }}</div>
      </div>
      <div class="form-item">
        <label>职称</label>
        <div class="info">{{ formatTitle(doctor.title) }}</div>
      </div>
      <div class="form-item">
        <label>所属医院</label>
        <div class="info">{{ doctor.hospital }}</div>
      </div>
      <div class="form-item">
        <label>医生简介</label>
        <div class="info">{{ doctor.introduction }}</div>
      </div>
      <el-button type="primary" @click="toComment(doctor)">查看评价</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/views/userLayout/Header/header.vue'
import router from '@/router'

export default {
  components: { Header },
  data() {
    return {
      doctor: {},
    }
  },
  mounted() {
    this.fetchDoctor()
    this.doctorId = localStorage.getItem('doctorId')
  },
  methods: {
    async fetchDoctor() {
      try {
        const response = await axios.get(`http://localhost:8081/doctor/findById?doctorId=${localStorage.getItem('doctorId')}`)
        this.doctor = response.data.data
      } catch (error) {
        console.error('Error fetching doctor:', error)
      }
    },
    toComment(doctor){
      localStorage.setItem('doctorId', doctor.doctorId)
      console.log(doctor.doctorId)
      router.push('/user/comment')
    },
    formatTitle(title) {
      switch (title) {
        case '1':
          return '医师'
        case '2':
          return '主治医师'
        case '3':
          return '副主任医师'
        case '4':
          return '主任医师'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 100px auto;
}

.form {
  margin-top: 20px;
}

.form-item {
  display: flex;
  margin-bottom: 15px;
}

.form-item label {
  width: 80px;
}

.info {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
}

</style>
