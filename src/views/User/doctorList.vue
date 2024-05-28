<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="container">
    <el-select v-model="selectedDepartment" placeholder="请选择科室">
      <el-option label="全部科室" value=""></el-option>
      <el-option label="呼吸内科" value="呼吸内科"></el-option>
      <el-option label="消化内科" value="消化内科"></el-option>
      <el-option label="神经内科" value="神经内科"></el-option>
      <el-option label="心血管内科" value="心血管内科"></el-option>
      <el-option label="肾内科" value="肾内科"></el-option>
      <el-option label="血液内科" value="血液内科"></el-option>
      <el-option label="免疫科" value="免疫科"></el-option>
    </el-select>

    <el-table :data="filteredDoctors" border stripe v-if="filteredDoctors.length > 0">
      <el-table-column prop="doctorId" label="医生ID"></el-table-column>
      <el-table-column prop="username" label="医生名"></el-table-column>
      <el-table-column prop="department" label="科室"></el-table-column>
      <el-table-column prop="title" label="职称">
        <template v-slot="scope">
          <span v-if="scope.row.title === '1'">医师</span>
          <span v-else-if="scope.row.title === '2'">主治医师</span>
          <span v-else-if="scope.row.title === '3'">副主任医师</span>
          <span v-else-if="scope.row.title === '4'">主任医师</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="reserveDoctor(scope.row)">
            点击预约
          </el-button>
          <el-button type="primary" size="small" @click="doctorInfo(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <p v-else>暂无医生信息</p>
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
      doctors: [],
      selectedDepartment: ''
    }
  },
  mounted() {
    this.fetchDoctors()
  },
  computed: {
    filteredDoctors() {
      if (!this.selectedDepartment) {
        return this.doctors
      } else {
        return this.doctors.filter(doctor => doctor.department === this.selectedDepartment)
      }
    }
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:8081/doctor/all')
        this.doctors = response.data.data
      } catch (error) {
        console.error('Error fetching doctors:', error)
      }
    },
    reserveDoctor(doctor) {
      this.$router.push({ name: 'reserve', params: { doctorId: doctor.doctorId } })
    },
    doctorInfo(doctor) {
      localStorage.setItem('doctorId', doctor.doctorId)
      router.push('/user/doctorInfo')
    },
  }
}
</script>

<style scoped>
.container {

  margin: 80px auto;
  max-width: 800px;
}
</style>
