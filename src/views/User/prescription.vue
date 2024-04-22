<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="main">
    <el-table :data="prescriptions" style="width: 100%" class="prescription-table" stripe border>
      <el-table-column prop="doctor_name" label="医生"></el-table-column>
      <el-table-column prop="department" label="科室"></el-table-column>
      <el-table-column prop="medicineName" label="处方药"></el-table-column>
      <el-table-column prop="count" label="数量"></el-table-column>
      <el-table-column prop="instruction" label="使用说明"></el-table-column>
      <el-table-column label="时间">
        <template v-slot="scope">
          {{ formatDate(scope.row.time) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/views/userLayout/Header/header.vue'

export default {
  components: { Header },
  data() {
    return {
      prescriptions: []
    }
  },
  mounted() {
    this.loadPrescriptions()
  },
  methods: {
    async loadPrescriptions() {
      try {
        const userId = 1
        const apiUrl = 'http://localhost:8081/prescription/findByUserId'
        const response = await axios.get(apiUrl, {
          params: {
            userId: userId
          }
        })
        this.prescriptions = response.data.data
      } catch (error) {
        console.error('Error loading prescriptions:', error)
      }
    },
    formatDate(visitTime) {
      const date = new Date(visitTime)
      const adjustedDate = new Date(date.getTime() - 8 * 60 * 60 * 1000)
      const year = adjustedDate.getFullYear()
      const month = String(adjustedDate.getMonth() + 1).padStart(2, '0')
      const day = String(adjustedDate.getDate()).padStart(2, '0')
      const hours = String(adjustedDate.getHours()).padStart(2, '0')
      const minutes = String(adjustedDate.getMinutes()).padStart(2, '0')
      const seconds = String(adjustedDate.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 100px;
  padding: 20px;
}

.prescription-table {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-table__header th {
  font-weight: bold;
}

.el-table__body td {
  color: #666;
}
</style>
