<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="main">
    <el-button type="primary" @click="showDialog();">添加评价</el-button>
    <br><br>
    <ul class="comment-list">
      <li v-if="comments.length === 0" class="no-comments">暂无数据</li>
      <li v-else v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-details">
          <span class="comment-author">用户:{{ comment.userId }}</span>
          <span class="comment-time">{{ formatDate(comment.commentTime) }}</span>
        </div>
      </li>
    </ul>
  </div>
  <el-dialog title="添加评价" v-model="dialogVisible">
    <el-form ref="addForm" :model="addForm" label-width="100px">
      <el-form-item label="内容" prop="content">
        <el-input v-model="addForm.content"></el-input>
      </el-form-item>
    </el-form>
    <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addComment()">添加</el-button>
      </span>
  </el-dialog>
</template>

<script>
import Header from '@/views/userLayout/Header/header.vue'
import axios from 'axios'

export default {
  components: { Header},
  data() {
    return {
      comments: [],
      dialogVisible: false,
      addForm: {
        content: ''
      }
    }
  },
  created() {
    this.fetchComments()
  },
  mounted() {
    this.doctorId = localStorage.getItem('doctorId')
  },
  methods: {
    fetchComments() {
      fetch(`http://localhost:8081/comment/findByDoctor?doctorId=${localStorage.getItem('doctorId')}`)
        .then(response => response.json())
        .then(data => {
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
    async addComment() {
      try {
        const params = new URLSearchParams()
        params.append('userId', 1)
        params.append('doctorId', localStorage.getItem('doctorId'))
        params.append('content', this.addForm.content)
        axios.post('http://localhost:8081/comment/addComment', params)
        this.$message.success('新增成功')
        this.dialogVisible = false
        window.location.reload()
      } catch (error) {
        console.error('Error adding content:', error)
      }
    },
    showDialog() {
      this.dialogVisible = true
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
