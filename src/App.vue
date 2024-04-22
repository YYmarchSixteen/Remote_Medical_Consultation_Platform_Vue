<template>
  <div class="app">
    <router-view/>
  </div>
  
</template>

<script>
export default {
 name:'app',
//  mounted(){
//    this.$router.push('/Login')
//  }
}
</script>

<style lang="scss">
html,
body,
#app{
  widows: 100%;
 height: 100%;
}
</style>
