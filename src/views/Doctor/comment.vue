<template>
  <div class="header">
    <doctorHeader></doctorHeader>
  </div>
  <div class="main">
    <ul class="comment-list">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-details">
          <span class="comment-author">用户:{{ comment.userId }}</span>
          <span class="comment-time">{{ formatDate(comment.commentTime) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import doctorHeader from '@/views/doctorLayout/doctorHeader.vue'

export default {
  components: { doctorHeader },
  data() {
    return {
      comments: []
    }
  },
  created() {
    this.fetchComments()
  },
  methods: {
    fetchComments() {
      // 使用fetch API从你的后端服务获取数据
      fetch('http://localhost:8081/comment/findByDoctor?doctorId=1')
        .then(response => response.json())
        .then(data => {
          // 将获取到的数据赋值给comments数组
          this.comments = data.data
        })
        .catch(error => {
          console.error('获取数据时出错:', error)
        })
    },
    formatDate(commentTime) {
      const date = new Date(commentTime)
      const adjustedDate = new Date(date.getTime() - 8 * 60 * 60 * 1000)
      const year = adjustedDate.getFullYear()
      const month = String(adjustedDate.getMonth() + 1).padStart(2, '0')
      const day = String(adjustedDate.getDate()).padStart(2, '0')
      const hours = String(adjustedDate.getHours()).padStart(2, '0')
      const minutes = String(adjustedDate.getMinutes()).padStart(2, '0')
      const seconds = String(adjustedDate.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
  }
}
</script>

<style>
.main{
  margin-top: 100px;
  width: 80%;
  margin-left: 10%;
}
.comment-list {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
}

.comment-details {
  margin-top: 5px;
  font-size: 0.9em;
  color: #888;
}

.comment-author {
  margin-right: 10px;
}

.comment-time {
  font-style: italic;
}
</style>
