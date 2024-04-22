<template>
  <div class="container">
    <div class="header">
      <doctorHeader></doctorHeader>
    </div>
    <div v-if="doctor">
      <el-form :model="doctor" label-width="80px">
        <el-form-item label="联系方式">
          <el-input v-model="doctor.telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="doctor.password"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="doctor.introduction" type="textarea" :rows="10"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:8081/doctor/uploadPicture'"
            :show-file-list="false"
            :data="{ doctorId: 1 }"
            :on-success="re"
            name="picture"
          >
            <img v-if="doctor.picture" :src="doctor.picture" class="avatar" :width="200" :height="200">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateDoctor">更新用户信息</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadPic">更新用户头像</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePassword">更改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-alert
        title="正在加载用户信息..."
        type="info"
        show-icon
      ></el-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import doctorHeader from '@/views/doctorLayout/doctorHeader.vue'

export default {
  components: { doctorHeader },
  data() {
    return {
      doctor: null
    }
  },
  mounted() {
    this.fetchDoctor()
  },
  methods: {
    async fetchDoctor() {
      try {
        const response = await axios.get('http://localhost:8081/doctor/findById?doctorId=1')
        this.doctor = response.data.data
      } catch (error) {
        console.error('Error fetching doctor:', error)
      }
    },
    async updateDoctor() {
      try {
        const params = new URLSearchParams()
        params.append('introduction', this.doctor.introduction)
        params.append('telephone', this.doctor.telephone)
        params.append('doctorId', 1)
        await axios.put('http://localhost:8081/doctor/changeInfo', params)
        alert('用户信息已更新')
      } catch (error) {
        console.error('Error updating doctor:', error)
        alert('更新用户信息时出错')
      }
    },
    re() {
      window.location.reload()
    },
    async uploadPic() {
      try {
        const params = new URLSearchParams()
        params.append('doctorId', 1)
        params.append('picture', this.doctor.picture)
        axios.post('http://localhost:8081/doctor/uploadPicture', params)
        window.location.reload()
      } catch (error) {
        console.error('Error uploading picture:', error)
        alert('上传图片时出错')
      }
    },
    async changePassword() {
      try {
        const params = new URLSearchParams()
        params.append('doctorId', 1)
        params.append('password', this.doctor.password)
        axios.put('http://localhost:8081/doctor/changePassword', params)
        window.location.reload()
      } catch (error) {
        console.error('Error uploading picture:', error)
        alert('NO changePassword')
      }
    },
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 100px auto;
}
</style>
