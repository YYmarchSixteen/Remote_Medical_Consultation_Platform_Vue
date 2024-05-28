<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="main">
    <el-table :data="Emrs" style="width: 100%" class="Emr-table" stripe border>
      <el-table-column prop="doctor_name" label="医生"></el-table-column>
      <el-table-column prop="department" label="科室"></el-table-column>
      <el-table-column prop="chiefComplaint" label="主诉"></el-table-column>
      <el-table-column prop="presentIllness" label="现病史"></el-table-column>
      <el-table-column prop="pastMedicalHistory" label="既往史"></el-table-column>
      <el-table-column prop="diagnosis" label="诊断结果"></el-table-column>
      <el-table-column label="时间">
        <template v-slot="scope">
          {{ formatDate(scope.row.visitTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="treatmentPlan" label="处理计划"></el-table-column>
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
      Emrs: []
    }
  },
  mounted() {
    this.loadEmrs()
    sessionStorage.getItem('userId')
  },
  methods: {
    async loadEmrs() {
      try {
        const userId = sessionStorage.getItem('userId')
        const apiUrl = 'http://localhost:8081/emr/findByUserId'
        const response = await axios.get(apiUrl, {
          params: {
            userId: userId
          }
        })
        this.Emrs = response.data.data
      } catch (error) {
        console.error('Error loading Emrs:', error)
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

.Emr-table {
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
