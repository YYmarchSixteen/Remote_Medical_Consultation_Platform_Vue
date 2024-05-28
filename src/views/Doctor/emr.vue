<template>
  <div class="container">
    <div class="header">
      <doctorHeader></doctorHeader>
    </div>
    <el-button @click="showDialog()" type="primary">添加病历</el-button>
    <br><br>
    <el-table :data="emrs" border stripe>
      <el-table-column prop="emrId" label="病历ID"></el-table-column>
      <el-table-column prop="user_name" label="姓名"></el-table-column>
      <el-table-column prop="chiefComplaint" label="主诉"></el-table-column>
      <el-table-column prop="presentIllness" label="现病史"></el-table-column>
      <el-table-column prop="pastMedicalHistory" label="既往史"></el-table-column>
      <el-table-column prop="diagnosis" label="诊断结果"></el-table-column>
      <el-table-column prop="treatmentPlan" label="治疗计划"></el-table-column>
      <el-table-column prop="visitTime" label="看病时间" width="200"></el-table-column>
    </el-table>
    <el-dialog title="新增病历" v-model="dialogVisible">
      <el-form ref="addForm" :model="addForm" label-width="100px">
        <el-form-item label="主诉" prop="chiefComplaint">
          <el-input v-model="addForm.chiefComplaint"></el-input>
        </el-form-item>
        <el-form-item label="现病史" prop="presentIllness">
          <el-input v-model="addForm.presentIllness"></el-input>
        </el-form-item>
        <el-form-item label="既往史" prop="pastMedicalHistory">
          <el-input v-model="addForm.pastMedicalHistory"></el-input>
        </el-form-item>
        <el-form-item label="诊断结果" prop="diagnosis">
          <el-input v-model="addForm.diagnosis"></el-input>
        </el-form-item>
        <el-form-item label="治疗计划" prop="treatmentPlan">
          <el-input v-model="addForm.treatmentPlan"></el-input>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addEMR">添加</el-button>
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
      emrs: [],
      dialogVisible: false,
      addForm: {
        chiefComplaint: '',
        presentIllness: '',
        pastMedicalHistory: '',
        diagnosis: '',
        treatmentPlan: ''
      }
    }
  },
  mounted() {
    this.fetchEMRs()
    this.userId = localStorage.getItem('userId')
    sessionStorage.getItem('doctorId')
  },
  methods: {
    async fetchEMRs() {
      try {
        const response = await axios.get(`http://localhost:8081/emr/findByUserId?userId=${localStorage.getItem('userId')}`)
        this.emrs = response.data.data
      } catch (error) {
        console.error('Error fetching emrs:', error)
      }
    },
    showDialog() {
      this.dialogVisible = true
    },
    async addEMR() {
      try {
        const params = new URLSearchParams()
        params.append('chiefComplaint', this.addForm.chiefComplaint)
        params.append('presentIllness', this.addForm.presentIllness)
        params.append('pastMedicalHistory', this.addForm.pastMedicalHistory)
        params.append('diagnosis', this.addForm.diagnosis)
        params.append('treatmentPlan', this.addForm.treatmentPlan)
        params.append('userId', this.userId)
        params.append('doctorId', sessionStorage.getItem('doctorId'))
        axios.post('http://localhost:8081/emr/addEmr', params)
        this.$message.success('新增成功')
        this.dialogVisible = false
        window.location.reload()
        await this.fetchEMRs()
      } catch (error) {
        console.error('Error adding EMR:', error)
      }
    },
  }
}
</script>

<style scoped>
.container {
  margin: 90px auto;
  max-width: 1000px;
}
</style>
