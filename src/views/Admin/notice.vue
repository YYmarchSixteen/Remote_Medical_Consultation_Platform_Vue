<template>
  <div class="container" ref="scrollContainer" style="max-height: 800px; overflow-y: auto;">
    <h1>公告列表</h1>
    <el-button type="primary" @click="showDialog1();" size="small">添加公告</el-button>
    <br><br>
    <el-table :data="notices" border stripe>
      <el-table-column prop="noticeId" label="公告ID"></el-table-column>
      <el-table-column prop="receiver" label="接收者">
        <template v-slot="scope">
          <span v-if="scope.row.receiver === 1">用户</span>
          <span v-else-if="scope.row.receiver === 2">医生</span>
          <span v-else-if="scope.row.receiver === 3">医生和用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容" width="200"></el-table-column>
      <el-table-column prop="status" label="当前状态">
        <template v-slot="scope">
          <span v-if="scope.row.status === 1">使用中</span>
          <span v-else-if="scope.row.status === 0">已禁用</span>
        </template>
      </el-table-column>
      <el-table-column prop="sendTime" label="发送时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button v-if="scope.row.status === 1" type="danger" size="small" @click="disableNotice(scope.row)">
            点击禁用
          </el-button>
          <el-button v-else-if="scope.row.status === 0" type="success" size="small" @click="activateNotice(scope.row)">
            激活公告
          </el-button>
          <el-button type="primary" @click="showDialog2();updateForm=scope.row" size="small">编辑公告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑公告" v-model="dialogVisible2">
      <el-form ref="updateForm" :model="updateForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="updateForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="updateForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateNotice">添加</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增公告" v-model="dialogVisible1">
      <el-form ref="addForm" :model="addForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="addForm.content"></el-input>
        </el-form-item>
        <el-form-item label="接收者" prop="receiver">
          <el-select v-model="addForm.receiver" placeholder="请选择接收者">
            <el-option label="用户" value="1"></el-option>
            <el-option label="医生" value="2"></el-option>
            <el-option label="医生和用户" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="addNotice">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ElDialog } from 'element-plus'

export default {
  components: { ElDialog },
  data() {
    return {
      notices: [],
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
    this.fetchNotices()
  },
  methods: {
    async fetchNotices() {
      try {
        if (this.loading || this.notices.length >= this.total) {
          return
        }
        this.loading = true
        const response = await axios.get('http://localhost:8081/notice/all', {
          params: {
            page: Math.ceil(this.notices.length / this.pageSize) + 1,
            pageSize: this.pageSize
          }
        })
        this.notices = this.notices.concat(response.data.data)
        this.loading = false
      } catch (error) {
        console.error('Error fetching notices:', error)
      }
    },
    async disableNotice(notice) {
      try {
        await axios.put(`http://localhost:8081/notice/disabled?noticeId=${notice.noticeId}`)
        this.$message.success('当前公告已禁用')
        window.location.reload()
      } catch (error) {
        console.error('Error disabling notice:', error)
      }
    },
    async activateNotice(notice) {
      try {
        await axios.put(`http://localhost:8081/notice/activate?noticeId=${notice.noticeId}`)
        this.$message.success('当前公告已激活')
        window.location.reload()
      } catch (error) {
        console.error('Error activating notice:', error)
      }
    },
    showDialog1() {
      this.dialogVisible1 = true
    },
    showDialog2() {
      this.dialogVisible2 = true
    },
    async updateNotice() {
      try {
        const params = new URLSearchParams()
        params.append('title', this.updateForm.title)
        params.append('content', this.updateForm.content)
        params.append('noticeId', this.updateForm.noticeId)
        axios.put('http://localhost:8081/notice/update', params)
        this.$message.success('编辑成功')
        this.dialogVisible2 = false
        window.location.reload()
      } catch (error) {
        console.error('Error adding Notice:', error)
      }
    },
    async addNotice() {
      try {
        const params = new URLSearchParams()
        params.append('title', this.addForm.title)
        params.append('content', this.addForm.content)
        params.append('receiver', this.addForm.receiver)
        axios.post('http://localhost:8081/notice/add', params)
        this.$message.success('新增成功')
        this.dialogVisible1 = false
        window.location.reload()
      } catch (error) {
        console.error('Error adding Notice:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  max-width: 1000px;
}
</style>
