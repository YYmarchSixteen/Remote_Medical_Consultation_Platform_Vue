<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="main">
    <el-table :data="appointments" style="width: 100%" class="appointment-table" stripe border>
      <el-table-column prop="doctor_name" label="医生"></el-table-column>
      <el-table-column prop="reserveTime" label="日期"></el-table-column>
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
      appointments: []
    }
  },
  mounted() {
    this.loadAppointments()
  },
  methods: {
    async loadAppointments() {
      try {
        const userId = 1
        const apiUrl = 'http://localhost:8081/reserve/myReserve'
        const response = await axios.get(apiUrl, {
          params: {
            userId: userId
          }
        })
        this.appointments = response.data.data
      } catch (error) {
        console.error('Error loading appointments:', error)
      }
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 100px;
  padding: 20px;
}

.appointment-table {
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
