<template>
  <div id="main-wrap">
      <router-view/>
  </div>
</template>

<script>
export default {
  name:"LayoutIndex", 
}
</script>

<style lang="scss" scoped>
#main-wrap{
    position: fixed;
    left: 250px;
    top: 50px;
    right: 0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    -webkit-box-sizing:border;
}
.box1{
  height: 2000px;
  background: url('../../../assets/8.webp') no-repeat;
  background-size: 1000px 300px;
}
</style>