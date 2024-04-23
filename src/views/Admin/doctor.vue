<template>
  <div class="container" ref="scrollContainer"  style="max-height: 800px; overflow-y: auto;">
    <h1>医生列表</h1>
    <el-table :data="doctors" border stripe>
      <el-table-column prop="doctorId" label="医生ID"></el-table-column>
      <el-table-column prop="username" label="医生名"></el-table-column>
      <el-table-column prop="department" label="科室"></el-table-column>
      <el-table-column prop="status" label="当前状态">
        <template v-slot="scope">
          <span v-if="scope.row.status === 0">未激活</span>
          <span v-else-if="scope.row.status === 1">使用中</span>
          <span v-else-if="scope.row.status === 2">已禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button v-if="scope.row.status === 2" size="small" type="success" @click="activateDoctor(scope.row)">
            恢复权限
          </el-button>
          <el-button v-else-if="scope.row.status === 1" type="danger" size="small" @click="disableDoctor(scope.row)">
            点击禁用
          </el-button>
          <el-button v-else-if="scope.row.status === 0" type="primary" size="small" @click="showDoctorDialog(scope.row)">
            审核账号
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="医生详情" :visible="dialogVisible" :model-value="dialogVisible" width="60%">
      <el-table :data="selectedDoctor">
        <el-table-column prop="username" label="姓名" width="150"></el-table-column>
        <el-table-column prop="telephone" label="联系方式" width="200"></el-table-column>
        <el-table-column prop="department" label="科室" width="200"></el-table-column>
        <el-table-column prop="hospital" label="医院" width="200"></el-table-column>
        <el-table-column prop="title" label="职称" width="200">
          <template v-slot="scope">
            <span v-if="scope.row.title === '1'">医师</span>
            <span v-else-if="scope.row.title === '2'">主治医师</span>
            <span v-else-if="scope.row.title === '3'">副主任医师</span>
            <span v-else-if="scope.row.title === '4'">主任医师</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="200"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
      </el-table>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="activateDoctor2()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      doctors: [],
      dialogVisible: false,
      selectedDoctor:null
    }
  },
  mounted() {
    this.fetchDoctors()
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
    async disableDoctor(doctor) {
      try {
        await axios.put(`http://localhost:8081/doctor/disable?doctorId=${doctor.doctorId}`)
        this.$message.success('当前账号已禁用')
        this.fetchDoctors()
      } catch (error) {
        console.error('Error disabling doctor:', error)
      }
    },
    async activateDoctor(doctor) {
      try {
        await axios.put(`http://localhost:8081/doctor/activate?doctorId=${doctor.doctorId}`)
        this.$message.success('当前账号已激活')
        this.fetchDoctors()
      } catch (error) {
        console.error('Error activating doctor:', error)
      }
    },
    async activateDoctor2() {
      try {
        if (this.selectedDoctor && this.selectedDoctor.length > 0 && this.selectedDoctor[0].doctorId) {
          await axios.put(`http://localhost:8081/doctor/activate?doctorId=${this.selectedDoctor[0].doctorId}`)
          this.$message.success('当前账号已激活')
          this.dialogVisible = false;
          this.fetchDoctors()
        } else {
          this.$message.error('未选择有效医生')
        }
      } catch (error) {
        console.error('Error activating doctor:', error)
      }
    },
    showDoctorDialog(doctor) {
      this.selectedDoctor = [doctor];
      this.dialogVisible = true;
      console.log(this.selectedDoctor)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  max-width: 800px;
}
.dialog-footer{
  text-align: center;
  margin-top: 3%;
}
</style>
