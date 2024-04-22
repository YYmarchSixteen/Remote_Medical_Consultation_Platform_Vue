<template>
  <div id="nav-wrap">
    <div id="xl">
      <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose" background-color="transparent" text-color="#333333" active-text-color="#333333" router>
        <template v-for="(item) in router.options.routes">
          <el-menu-item v-if="!item.hidden" :key="item.path" :index="item.path">
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  name: 'navMenu',
  setup() {
    const router = useRouter()
    const isCollapse = ref(false)
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      isCollapse,
      handleOpen,
      handleClose,
      router
    }
  }
}
</script>

<style lang="scss" scoped>
.lgoinImg {
  margin-left: 127px;
  margin-top: 75px;
  margin-bottom: -55px;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lgoinImg img {
  width: 85px;
  height: 85px;
  background: #545454;
  border-radius: 50%;
  border: 10px solid #fff;
}

#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: RGB(236, 250, 240);
  // background-color:green;
}

#xl {
  width: 251px;
}

.logo {
  text-align: center;

  img {
    margin: auto;
    width: 100px;
  }
}
</style>
