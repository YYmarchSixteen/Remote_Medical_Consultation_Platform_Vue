<template>
  <div class="header">
    <el-header class="header-wrapper" height="70px">
      <div class="header-logo" @click="gotoLogin">
        <img src="../../assets/OIP-C.jpg" alt="logo" class="logo-img" />
        <span class="logo-text">远程医疗咨询平台</span>
      </div>
      <div class="header-nav">
        <el-menu :default-active="$route.path" mode="horizontal" router>
          <el-menu-item index="/Doctor/patient">病人管理</el-menu-item>
          <el-menu-item index="/Doctor/message">我的消息</el-menu-item>
          <el-menu-item index="/Doctor/comment">我的评价</el-menu-item>
          <el-menu-item index="/Doctor/article">文章管理</el-menu-item>
          <el-menu-item index="/Doctor/personal">个人中心</el-menu-item>
          <el-menu-item index="/">注销</el-menu-item>
        </el-menu>
      </div>
    </el-header>
  </div>
</template>

<script>

export default {
  name: 'doctorHeader',
  data() {
    return {
      searchTerm: '',
      equipmentTypes: []
    }
  },
  mounted() {

  },
  methods: {
    gotoLogin() {
      this.$router.push('/login')
    }
  }
}
</script>


<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-logo {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.logo-img {
  height: 40px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}

.header-nav {
  margin-right: 40%;
}


body {
  font-family: 'Microsoft YaHei',serif;
  color: #666;
  font-size: 12px;
}
</style>
