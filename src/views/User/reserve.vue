<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="container">
    <el-date-picker v-model="selectedDate" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                    @change="handleDateChange">
    </el-date-picker>
    <el-table :data="tableData" border style="width: 450px">
      <el-table-column prop="time" label="时间" width="150">
      </el-table-column>
      <el-table-column prop="column2" label="预约状态" width="150">
      </el-table-column>
      <el-table-column prop="column3" label="操作" width="150">
        <template v-slot="scope">
          <el-button type="primary" v-if="scope.row.column2 === '无预约'" @click="reserve(scope.row)">预约</el-button>
          <span v-else>已预约</span>
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
      selectedDate: '',
      reservations: [],
      doctorId: '',
      tableData: [],
      pickerOptions: {
        disabledDate: this.disabledDate.bind(this)
      }
    }
  },
  mounted() {
    this.generateTableData()
    this.doctorId = this.$route.params.doctorId
  },
  methods: {
    reserve(row) {
      const params = new URLSearchParams()
      params.append('userId', 1)
      params.append('doctorId', this.doctorId)
      params.append('reserveTime', this.selectedDate)
      params.append('sequence', row.index)
      axios.post('http://localhost:8081/reserve/addReserve', params)
      //window.location.reload()
      row.column2 = '已预约'
    },
    generateTableData() {
      const startTime = new Date('2024-04-07T08:00:00')
      for (let i = 0; i < 15; i++) {
        const time = new Date(startTime.getTime() + i * 15 * 60000)
        this.tableData.push({
          index: i + 1, // Adding unique index
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          column2: '无预约',
          column3: ''
        })
      }
    },
    handleDateChange() {
      this.selectedDate = this.selectedDate ? this.formatDate(this.selectedDate) : ''
      console.log('Selected date:', this.selectedDate)
    },
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    disabledDate(time) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      time.setHours(0, 0, 0, 0)
      return time < today
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 80px;
  margin-left: 40%;
  max-width: 800px;
}

</style>
