<template>
  <div class="header">
    <doctorHeader></doctorHeader>
  </div>
  <div class="container" ref="scrollContainer" style="max-height: 800px; overflow-y: auto;">
    <el-button type="primary" @click="showDialog1();" size="small">添加文章</el-button>
    <br><br>
    <el-table :data="articles" border stripe>
      <el-table-column prop="articleId" label="文章ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容" width="200"></el-table-column>
      <el-table-column prop="sendTime" label="发送时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" @click="showDialog2();updateForm=scope.row" size="small">编辑文章</el-button>
          <el-button type="danger" @click="deleteArticle(scope.row)" size="small">删除文章</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑文章" v-model="dialogVisible2">
      <el-form ref="updateForm" :model="updateForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="updateForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <el-input v-model="updateForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateArticle">完成</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增文章" v-model="dialogVisible1">
      <el-form ref="addForm" :model="addForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <el-input v-model="addForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="addArticle">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ElDialog } from 'element-plus'
import doctorHeader from '@/views/doctorLayout/doctorHeader.vue'

export default {
  components: { doctorHeader, ElDialog },
  data() {
    return {
      articles: [],
      dialogVisible1: false,
      dialogVisible2: false,
      updateForm: {
        title: '',
        content: ''
      },
      addForm: {
        title: '',
        content: ''
      }
    }
  },
  mounted() {
    this.fetchArticles()
    sessionStorage.getItem('doctorId')
    //console.log(sessionStorage.getItem('doctorId'))
  },
  methods: {
    async fetchArticles() {
      try {
        if (this.loading || this.articles.length >= this.total) {
          return
        }
        this.loading = true
        const response = await axios.get('http://localhost:8081/article/all', {
          params: {
            page: Math.ceil(this.articles.length / this.pageSize) + 1,
            pageSize: this.pageSize
          }
        })
        this.articles = this.articles.concat(response.data.data)
        this.loading = false
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    },
    showDialog1() {
      this.dialogVisible1 = true
    },
    showDialog2() {
      this.dialogVisible2 = true
    },
    async updateArticle() {
      try {
        const params = new URLSearchParams()
        params.append('title', this.updateForm.title)
        params.append('content', this.updateForm.content)
        params.append('articleId', this.updateForm.articleId)
        axios.put('http://localhost:8081/article/edit', params)
        this.$message.success('编辑成功')
        this.dialogVisible2 = false
        await this.fetchArticles()
        window.location.reload()
      } catch (error) {
        console.error('Error adding article:', error)
      }
    },
    async addArticle() {
      try {
        const params = new URLSearchParams()
        params.append('title', this.addForm.title)
        params.append('content', this.addForm.content)
        params.append('doctorId', sessionStorage.getItem('doctorId'))
        axios.post('http://localhost:8081/article/add', params)
        this.$message.success('新增成功')
        this.dialogVisible1 = false
        window.location.reload()
      } catch (error) {
        console.error('Error adding article:', error)
      }
    },
    async deleteArticle(article) {
      try {
        this.articleId = article.articleId
        axios.delete(`http://localhost:8081/article/delete?articleId=${this.articleId}`)
        this.$message.success('删除成功')
        window.location.reload()
      } catch (error) {
        console.error('Error deleting article:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin: 120px auto;
  max-width: 1000px;
}
</style>
