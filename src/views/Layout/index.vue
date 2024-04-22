<template>
  <div id="layout">
    <nav id="navbar">
      <LayoutHeader />
    </nav>
    <div id="sidebar">
      <LayoutNav />
    </div>
    <LayoutMain />
  </div>
</template>

<script>
import LayoutHeader from './Headers/index.vue'
import LayoutMain from './Main/Main.vue'
import LayoutNav from './Nav/Nav.vue'
export default {
  name: 'LayoutIndex',
  components: { LayoutMain, LayoutHeader, LayoutNav },
  setup() {

  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  position: fixed;
  top: 50px; /* 设置侧边栏距离顶部的距离 */
  left: 0;
  width: 200px; /* 缩小侧边栏的宽度 */
  bottom: 0;
  background-color: #fff;
  border-right: 1px solid #ccc;
}

#navbar {
  position: fixed;
  top: 0;
  left: 200px; /* 设置导航栏距离左侧的距离 */
  right: 0;
  height: 70px; /* 增加导航栏的高度 */
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  display: flex; /* 使用flex布局 */
  justify-content: space-between; /* 使用justify-content属性调整子元素的排列方式 */
  align-items: center; /* 使用align-items属性垂直居中子元素 */
}

#layout {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex; /* 使用flex布局 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: flex-start; /* 使用justify-content属性使主轴排列起点对齐 */
  align-items: stretch; /* 使用align-items属性伸展子元素以填充容器 */
}
</style>
