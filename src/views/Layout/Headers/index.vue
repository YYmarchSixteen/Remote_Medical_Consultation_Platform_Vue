<template>
  <body>
  <div id="box2">
    <div class="box">
      <h1>
        远程医疗咨询平台后台管理系统
      </h1>
    </div>
    <div class="time1">
      <timein />
    </div>
    <div div="zh">
      <div class="asv1">
        <screen />
      </div>
      <div class="asv">
        <avatar></avatar>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import avatar from './components/avatar.vue'
import screen from './components/screenFull.vue'
import timein from './components/time.vue'

export default {
  name: 'LayoutIndex',
  components: { avatar, screen, timein },
  setup() {
  }
}
</script>

<style lang="scss" scoped>
#box2 {
  position: fixed;
  top: 0;
  left: 0;
  height: 7%;
  width: 100%;
  background-color: RGB(0, 166, 147);
}

.box {
  position: absolute;
  color: #0ed33f;
  margin-left: 20%;
  margin-top: 6px;
  font: 1.5em sans-serif;
}

h1 {
  color: #fff;
margin-top: 0px;
  margin-left: -20%;
}

.asv1 {
  position: absolute;
  margin-top: 6px;
  margin-left: 90%;
  cursor: pointer;
  color: #000000;
}

.asv {
  position: absolute;
  margin-left: 94%;
  margin-top: 5px;
}

.time1 {
  position: absolute;
  height: 5%;
  margin-left: 77%;
  margin-top: 6px;
}
</style>