<template>
  <div class="header">
    <doctorHeader></doctorHeader>
  </div>
  <div class="container">
    <el-button type="primary" @click="showDialog();" size="small">添加处方</el-button>
    <br><br>
    <el-table :data="prescriptions" border stripe>
      <el-table-column prop="prescriptionId" label="处方ID"></el-table-column>
      <el-table-column prop="medicineName" label="处方"></el-table-column>
      <el-table-column prop="count" label="数量"></el-table-column>
      <el-table-column prop="instruction" label="使用说明" width="220"></el-table-column>
      <el-table-column prop="time" label="开方时间" width="200"></el-table-column>
    </el-table>
    <el-dialog title="新增处方" v-model="dialogVisible">
      <el-form ref="addForm" :model="addForm" label-width="100px">
        <el-form-item label="处方药" prop="medicineId">
          <el-select v-model="addForm.medicineId" placeholder="请选择药品">
            <el-option
              v-for="medicine in medicines"
              :key="medicine.medicineId"
              :label="medicine.medicineName"
              :value="medicine.medicineId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="addForm.count"></el-input>
        </el-form-item>
        <el-form-item label="使用说明" prop="instruction">
          <el-input v-model="addForm.instruction"></el-input>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addPrescription">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ElDialog } from 'element-plus'
import doctorHeader from '@/views/doctorLayout/doctorHeader.vue'

export default {
  components: { doctorHeader, ElDialog },
  data() {
    return {
      prescriptions: [],
      dialogVisible: false,
      medicines: [],
      addForm: {
        medicineId: '',
        count: '',
        instruction: '',
      }
    }
  },
  mounted() {
    this.fetchPrescriptions()
    this.fetchMedicines()
    this.userId = localStorage.getItem('userId')
    sessionStorage.getItem('doctorId')
  },
  methods: {
    async fetchPrescriptions() {
      try {
        const response = await axios.get(`http://localhost:8081/prescription/findByUserId?userId=${localStorage.getItem('userId')}`)
        this.prescriptions = response.data.data
      } catch (error) {
        console.error('Error fetching prescriptions:', error)
      }
    },
    showDialog() {
      this.dialogVisible = true
    },
    async addPrescription() {
      try {
        const params = new URLSearchParams()
        params.append('medicineId', this.addForm.medicineId)
        params.append('count', this.addForm.count)
        params.append('instruction', this.addForm.instruction)
        params.append('userId', localStorage.getItem('userId'))
        params.append('doctorId', sessionStorage.getItem('doctorId'))
        axios.post('http://localhost:8081/prescription/addRx', params)
        this.$message.success('新增成功')
        this.dialogVisible = false
        window.location.reload()
        await this.fetchPrescriptions()
      } catch (error) {
        console.error('Error adding prescription:', error)
      }
    },
    async fetchMedicines() {
      try {
        const response = await axios.get('http://localhost:8081/medicine/all')
        this.medicines = response.data.data
      } catch (error) {
        console.error('Error fetching medicines:', error)
      }
    },
  }
}
</script>

<style scoped>
.container {
  margin: 120px auto;
  max-width: 1000px;
}
</style>
