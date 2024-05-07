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
        <div class="login_input">
          <el-form-item prop="address">
            <el-input prefix-icon="Location" placeholder="请输入地址" v-model="form.address"
                      :name="'address'"></el-input>
          </el-form-item>
        </div>
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
      regMsg: ''
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
          params.append('address', this.form.address)
          axios.post('http://localhost:8081/user/reg', params)
            .then((res) => {
              this.regMsg = res.data.msg
              if (res.data.status === '200') {
                this.$message.success('注册成功！')
                this.$router.push('/user/login')
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

.login_input .el-radio-group {
  display: flex;
  align-items: center;
}

.login_input .el-radio-group .el-radio {
  margin-right: 10px;
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
