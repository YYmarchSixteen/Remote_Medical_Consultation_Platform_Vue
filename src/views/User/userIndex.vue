<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="pic">
    <div class="main">
      <el-icon size="30px">
        <View />
      </el-icon>
      最新上线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;<el-icon size="30px">
      <ChatDotRound />
    </el-icon>
      白内障和青光眼会相互诱发吗？
    </div>
    <div class="carousel">
      <Carousel></Carousel>
    </div>
    <div class="demo1-video">
      <video id="myVideo" class="video" controls
             poster="http://1256913445.vod2.myqcloud.com/b8de9d62vodbj1256913445/17442e8a387702302273121894/pjGb8V.jpeg?size=355*200">
        <source src="http://s.39.net/video_YSS/gzykdxfsd1yy/chenghao/baineizhang02/4.mp4" type="video/mp4">
      </video>
    </div>
  </div>
  <div class="list-container">

    <div class="list1">
      <ul class="custom-list">
        <li v-for="(item, index) in article" :key="'article-' + index">
          <el-icon>
            <Star />
          </el-icon> &nbsp; {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="list2">
      <ul class="custom-list">
        <h2 class="section-title">系统公告</h2>
        <li v-for="(item, index) in notice" :key="'notice-' + index">
          <el-icon>
            <ChatDotRound />
          </el-icon> &nbsp; {{ item.title }}
        </li>
      </ul>
    </div>
  </div>

  <div class="footer">
    <div class="word">
      <span class="expert">专家</span>
      <span class="popularize">科普</span>
    </div>
    <div class="custom-line"></div>
  </div>
</template>

<script>
import Header from '../userLayout/Header/header.vue'
import Carousel from '../userLayout/Carousel/carousel.vue'
import axios from 'axios'

export default {
  components: {
    Header,
    Carousel
  },
  data() {
    return {
      notice: [],
      article: []
    }
  },
  mounted() {
    this.fetchNotice()
    this.fetchArticle()
  },
  methods: {
    fetchNotice() {
      axios.get('http://localhost:8081/notice/user')
        .then(response => {
          this.notice = response.data.data
        })
        .catch(error => {
          console.error('Error fetching notices:', error)
        })
    },
    fetchArticle() {
      axios.get('http://localhost:8081/article/all')
        .then(response => {
          this.article = response.data.data
        })
        .catch(error => {
          console.error('Error fetching articles:', error)
        })
    }
  }
}
</script>

<style scoped>

.carousel {
  margin-top: 1%;
  margin-left: 20%;
  float: left;
}

.main {
  margin-top: 5%;
  margin-left: 20%;
  font-size: x-large;
}

.video {
  width: 500px;
  height: 300px;
  margin-left: 50px;
}

.custom-list {
  list-style: none;
  padding: 0;
  width: 1000px;
  margin: 50px 0 0 450px;
}

.custom-list li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 20px;
  color: #333;
  border: 2px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.custom-list li:hover {
  background-color: #e0e0e0;
}

.word {
  font-size: 30px;
  color: black;
  display: flex;
  justify-content: center;
}

.expert {
  color: black;
}

.popularize {
  color: #0093E8;
}

.custom-line {
  height: 3px;
  width: 100%;
  background-color: #0093E8;
  margin-top: 5px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  text-align: center;
}

</style>
