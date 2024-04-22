<template>
  <div class="header">
    <el-header class="header-wrapper" height="70px">
      <div class="header-logo" @click="gotoLogin">
        <img src="../../../assets/OIP-C.jpg" alt="logo" class="logo-img" />
        <span class="logo-text">远程医疗咨询平台</span>
      </div>
      <div class="header-nav">
        <el-menu :default-active="$route.path" mode="horizontal" router @select="handleSelect">
          <el-menu-item index="/user/userIndex">首页</el-menu-item>
          <el-menu-item index="/user/doctor">预约问诊</el-menu-item>
          <el-menu-item index="/user/message">我的消息</el-menu-item>
          <el-menu-item index="/user/medicine">药品商城</el-menu-item>
          <el-menu-item index="/user/cart">购物车</el-menu-item>
          <el-menu-item index="/user/order">我的订单</el-menu-item>
          <el-sub-menu index="2">
            <template v-slot:title>个人中心</template>
            <el-menu-item index="/user/personal">个人信息</el-menu-item>
            <el-menu-item index="/user/myReserve">我的预约</el-menu-item>
            <el-menu-item index="/user/emr">我的病历</el-menu-item>
            <el-menu-item index="/user/prescription">我的处方</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/user/login">注销</el-menu-item>
        </el-menu>
      </div>
      <div class="header-search">
      </div>
    </el-header>
  </div>
</template>

<script>

export default {
  name: 'Header',
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
      // 删除sessionStorage中的username
      sessionStorage.removeItem('username')
      // 跳转到登录页面
      this.$router.push('/user/login')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
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
  margin-right: 120px;
}

.header-search {
  margin-right: 20px;
}

body {
  font-family: 'Microsoft YaHei', serif;
  color: #666;
  font-size: 12px;
}
</style>
