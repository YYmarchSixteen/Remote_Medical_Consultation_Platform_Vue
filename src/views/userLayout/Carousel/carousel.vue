<template>
  <div id="app" class="container-fixed">
    <!--轮播-->
    <div class="slide-show">
      <div class="slide-img">
        <a :href="slides[nowIndex].href">
          <img :src="slides[nowIndex].src" alt=""/>
        </a>
      </div>
      <h2>{{ slides[nowIndex].title }}</h2>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "LunBo",
  data() {
    return {
      slides: [
        {
          src:
            "https://remote-medical-consultation-platform-database.oss-cn-beijing.aliyuncs.com/1.jpg",
          title: "周细中：为了让癫痫孩子重返校园",
          href: "/news1",
        },
        {
          src:
            "https://remote-medical-consultation-platform-database.oss-cn-beijing.aliyuncs.com/2.jpg",
          title: "“手机一响我就害怕...”",
          href: "/news2",
        },
        {
          src:
            "https://remote-medical-consultation-platform-database.oss-cn-beijing.aliyuncs.com/3.png",
          title: "被忽视的产后女性，情绪正在慢慢崩溃……",
          href: "",
        },
        {
          src:
            "https://remote-medical-consultation-platform-database.oss-cn-beijing.aliyuncs.com/4.png",
          title: "从没来过月经的女孩，医生为她重塑“女儿身”",
          href: "",
        },
        {
          src:
            "https://remote-medical-consultation-platform-database.oss-cn-beijing.aliyuncs.com/5.png",
          title: "拼了老命的80后，却“硬”不起来了",
          href: "",
        },
      ],
      nowIndex: 0,
      invId: 0,
    };
  },

  computed: {
    nextIndex() {
      return this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex + 1;
    },
  },

  methods: {
    goto(index) {
      this.clearInv();
      this.nowIndex = index;
      this.runInv();
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, 2000);
    },
    clearInv() {
      clearInterval(this.invId);
    },
  },

  mounted() {
    this.runInv();
  },
};
</script>
  
<style scoped>

p {
    text-align: center;
    font-size: 25px;
    color: cadetblue;
    font-family: fantasy;
}

h2{
  font-size: larger;
}
</style>
  