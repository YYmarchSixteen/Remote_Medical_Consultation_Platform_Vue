<template>
  <div class="main">
    <el-form :model="form" label-position="top" :rules="rules" ref="formRef" @submit.prevent="regForm">
      <div class="back_img"></div>
      <div class="login">
        <div class="lgoinImg">
          <img src="../../assets/img/3.webp" />
        </div>
        <div class="login_title"></div>
        <div class="login_input">
          <el-form-item prop="username">
            <el-input prefix-icon="User" placeholder="请输入姓名" v-model="form.username" :name="'username'"></el-input>
          </el-form-item>
        </div>
        <div class="login_input">
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" placeholder="请输入密码" show-password v-model="form.password"
                      :name="'password'"></el-input>
          </el-form-item>
        </div>
        <div class="login_input">
          <el-form-item prop="IdCard">
            <el-input prefix-icon="clock" placeholder="请输入身份证号" v-model="form.IdCard"
                      :name="'IdCard'"></el-input>
          </el-form-item>
        </div>
        <div class="login_input">
          <el-form-item prop="telephone">
            <el-input prefix-icon="Phone" placeholder="请输入电话" v-model="form.telephone"
                      :name="'telephone'"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form label-width="100px">
            <el-form-item label="大科室">
              <el-select v-model="selectedDepartment" placeholder="请选择大科室" @change="handleDepartmentChange">
                <el-option v-for="(department, index) in departments" :key="index" :label="department"
                           :value="department"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="selectedDepartment" label="小科室">
              <el-select v-model="selectedSubDepartment" placeholder="请选择小科室">
                <el-option v-for="(subDepartment, index) in subDepartments[selectedDepartment]" :key="index"
                           :label="subDepartment" :value="subDepartment"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-form-item label="职称" prop="title">
          <el-select v-model="form.title" placeholder="请选择职称">
            <el-option label="医师" value="1"></el-option>
            <el-option label="主治医师" value="2"></el-option>
            <el-option label="副主任医师" value="3"></el-option>
            <el-option label="主任医师" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="introduction">
          <el-input prefix-icon="Location" placeholder="请输入介绍" v-model="form.introduction"
                    :name="'introduction'"></el-input>
        </el-form-item>
        <el-form-item prop="hospital">
          <el-input prefix-icon="Location" placeholder="请输入医院" v-model="form.hospital"
                    :name="'hospital'"></el-input>
        </el-form-item>
        <div class="login_button">
          <p @click="regForm">注册</p>
        </div>
      </div>
    </el-form>
    <p style="color:red">{{ regMsg }}</p>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'

export default {
  name: 'LoginRegister',
  data() {
    return {
      BASE_URL: 'http://localhost:8081/',
      form: {
        username: '',
        password: '',
        IdCard: '',
        telephone: '',
        address: ''
      },
      types: [],
      value: '',
      regMsg: '',
      selectedDepartment: '',
      selectedSubDepartment: '',
      departments: ['内科', '外科', '妇产科', '儿科', '五官科', '肿瘤科', '皮肤性病科', '中医科', '传染科', '精神心理科'],
      subDepartments: {
        '内科': ['呼吸内科', '消化内科', '神经内科', '心血管内科', '肾内科', '血液内科', '免疫科', '内分泌科'],
        '外科': ['普通外科', '神经外科', '心胸外科', '泌尿外科', '心血管外科', '乳腺外科', '肝胆外科', '器官移植', '肛肠外科', '烧伤科', '骨外科'],
        '妇产科': ['妇科', '产科', '计划生育', '妇幼保健'],
        '儿科': ['儿科综合', '小儿内科', '小儿外科', '新生儿科', '儿童营养保健科'],
        '五官科': ['耳鼻喉科', '眼科', '口腔科'],
        '肿瘤科': ['肿瘤内科', '肿瘤外科', '肿瘤妇科', '骨肿瘤科', '放疗科', '肿瘤康复科', '肿瘤综合科'],
        '皮肤性病科': ['皮肤科', '性病科'],
        '中医科': ['中医全科', '中医内科', '中医外科', '中医妇科', '中医儿科', '中医保健科', '针灸按摩科', '中医骨伤科', '中医肿瘤科'],
        '传染科': ['肝病科', '艾滋病科', '结核病', '寄生虫'],
        '精神心理科': ['精神科', '心理咨询科']
      }
    }
  },
  setup() {
    const rules = ref({
      username: [
        {
          required: true,
          message: '请填写账户',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        }
      ],
      IdCard: [
        {
          required: true,
          message: '请填写身份证号',
          trigger: 'blur'
        }
      ],
      telephone: [
        {
          required: true,
          message: '请填写电话',
          trigger: 'blur'
        }
      ],
      address: [
        {
          required: true,
          message: '请填写地址',
          trigger: 'blur'
        }
      ]
    })

    return { rules }
  },
  mounted() {
  },
  methods: {
    regForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          params.append('username', this.form.username)
          params.append('password', this.form.password)
          params.append('IdCard', this.form.IdCard)
          params.append('telephone', this.form.telephone)
          params.append('department', this.selectedSubDepartment)
          params.append('introduction', this.form.introduction)
          params.append('hospital', this.form.hospital)
          params.append('title', this.form.title)
          console.log(params)
          axios.post('http://localhost:8081/doctor/reg', params)
            .then((res) => {
              this.regMsg = res.data.msg
              if (res.data.status === '200') {
                this.$message.success('注册成功！')
                this.$router.push('/')
              } else if (res.data.status === '403') {
                this.$message.error('用户名已存在,注册失败！')
              } else {
                this.$message.error('注册失败！')
              }
              console.log(res.data.status)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login_input {
  margin-bottom: 20px;
}

.login_input label {
  margin-right: 10px;
  font-weight: bold;
}

.back_img {
  background: url('../../assets/bk.jpg');
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  opacity: 0.9;
  padding: 30px;
  width: 18%;
  border: 1px solid #eee;
  border-radius: 20px;
}

.lgoinImg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lgoinImg img {
  width: 110px;
  height: 110px;
  background: #eceeed;
  border-radius: 50%;
  border: 10px solid #fff;
}

.login_title {
  text-align: center;
  padding-bottom: 20px;
}

.login_input {
  margin-top: 15px;
}

.login_input:nth-child(2) {
  margin-bottom: 20px;
}

.login_input:nth-child(3) {
  margin-top: 20px;
}

.login_input:nth-child(4) {
  margin-bottom: 20px;
}

.login_button {
  margin-top: 20px;
  display: flex;
}

.login_button p {
  color: #fff;
  font-size: 15px;
  display: block;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  border: 1px solid #ddd;
}

.login_button p:nth-child(1) {
  background: #409eff;
  margin-right: 10px;
}
</style>
