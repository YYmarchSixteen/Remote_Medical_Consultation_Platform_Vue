<template>
  <div class="container" ref="scrollContainer"  style="max-height: 800px; overflow-y: auto;">
    <el-button type="primary" @click="showAddAdminDialog" size="small">添加管理员</el-button>
    <el-table :data="admins" border stripe>
      <el-table-column prop="adminId" label="管理员ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="telephone" label="联系方式"></el-table-column>
      <el-table-column label="权限">
        <template v-slot="scope">
          <span v-if="scope.row.role === 0">已禁用</span>
          <span v-else-if="scope.row.role === 1">超级管理员</span>
          <span v-else-if="scope.row.role === 2">使用中</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button v-if="scope.row.role === 1" size="small" disabled type="info">不可操作</el-button>
          <el-button v-else-if="scope.row.role === 2" type="danger" size="small" @click="disableAdmin(scope.row)">
            点击禁用
          </el-button>
          <el-button v-else-if="scope.row.role === 0" type="success" size="small" @click="activateAdmin(scope.row)">
            激活账号
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加管理员" v-model="dialogVisible">
      <el-form ref="addAdminForm" :model="addAdminForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addAdminForm.username"></el-input>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addAdmin">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ElDialog } from 'element-plus'


export default {
  components: {
    ElDialog
  },
  data() {
    return {
      admins: [],
      dialogVisible: false,
      addAdminForm: {
        username: ''
      }
    }
  },
  mounted() {
    this.fetchAdmins()
  },
  methods: {
    async fetchAdmins() {
      try {
        const response = await axios.get('http://localhost:8081/admin/all')
        this.admins = response.data.data
      } catch (error) {
        console.error('Error fetching admins:', error)
      }
    },
    async disableAdmin(admin) {
      try {
        await axios.put(`http://localhost:8081/admin/disable?adminId=${admin.adminId}`)
        this.$message.success('当前账号已禁用')
        this.fetchAdmins()
      } catch (error) {
        console.error('Error disabling admin:', error)
      }
    },
    async activateAdmin(admin) {
      try {
        await axios.put(`http://localhost:8081/admin/active?adminId=${admin.adminId}`)
        this.$message.success('当前账号已激活')
        this.fetchAdmins()
      } catch (error) {
        console.error('Error activating admin:', error)
      }
    },
    showAddAdminDialog() {
      this.dialogVisible = true
    },
    async addAdmin() {
      try {
        const params = new URLSearchParams()
        params.append('username', this.addAdminForm.username)
        params.append('role', '0')
        axios.post('http://localhost:8081/admin/add', params)
        this.$message.success('管理员添加成功')
        this.dialogVisible = false
        await this.fetchAdmins()
        window.location.reload()
      } catch (error) {
        console.error('Error adding admin:', error)
      }
    },
  }
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  max-width: 800px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
