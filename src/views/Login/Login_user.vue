<template>
  <div class="main">
    <el-form :model="from" label-position="top" :rules="rules" ref="fromRef">
      <div class="back_img"></div>
      <div class="login">
        <div class="lgoinImg">
          <img src="../../assets/img/3.webp" />
        </div>
        <div class="login_title"></div>
        <div class="login_input">
          <el-form-item prop="name">
            <el-input prefix-icon="User" placeholder="请输入手机号码或身份证号码" v-model="from.name"></el-input>
          </el-form-item>
        </div>
        <div class="login_input">
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" placeholder="请输入密码" show-password v-model="from.password"></el-input>
          </el-form-item>
        </div>
        <div class="login_button">
          <p @click="checkLogin(from)">登录</p>
          <p @click="reg()">注册</p>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
// do not use same name with ref

export default {
  name: 'LoginRegister',
  data() {
    return {
      BASE_URL: 'http://localhost:8081/',
      from: {
        name: '',
        password: ''
      },
      types: [],
      value: '',
      login: []
    }
  },
  setup() {
    const rules = ref({
      name: [
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
      ]
    })

    return { rules }
  },
  mounted() {
  },
  methods: {
    reg() {
      // 跳转到 /reg 页面
      this.$router.push('/user/reg')
    },
    checkLogin(from) {
      const params = new URLSearchParams()
      params.append('username', from.name)
      params.append('password', from.password)
      axios.post(this.BASE_URL + 'user/login', params)
        .then(res => {
          if (res.data.status === '200') {
            this.$message.success('登录成功,欢迎回来')
            this.$router.push('/user/message')
          } else {
            this.$message.error('用户名或密码错误，登录失败')
          }
        })
        .catch(err => {
          console.error(err)
          this.$message.error('登录失败，请稍后再试')
        })
    }
  }
}
</script>


<style scoped>
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
  /* background: #65768557; */
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

.login_button p:nth-child(2) {
  background: #67c23a;
  margin-left: 10px;
}
</style>
