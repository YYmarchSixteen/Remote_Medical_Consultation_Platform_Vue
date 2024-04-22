<template>
  <el-card class="box-card">
    <el-button type="primary" @click="add(props)" class="box-card1">添加药品</el-button>
    <el-table :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="medicineId" label="ID" width="200" />
      <el-table-column prop="medicineName" label="药品名" width="150" />
      <el-table-column prop="feature" label="功能" width="150">
        <template #default="{ row }">
          <div>{{ formatText(row.feature, 15) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="150" />
      <el-table-column prop="typeName" label="所属类型" width="150" />
      <el-table-column prop="picture" label="图片" width="300">
        <template #default="scope">
          <el-image style="width: 70px; height: 70px" :src="scope.row.picture" alt="" :fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table>
      </el-table>
      <el-table-column fixed="right" label="操作" width="240">
        <template #default="row">
          <el-button type="success" @click="handleClick(row)">编辑</el-button>
          <el-button type="danger" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加框 -->
    <el-dialog v-model="dialogVisible1" title="增加" width="30%">
      <el-form label-width="120px">
        <el-form-item label="药品名">
          <el-input v-model="info1.medicineName" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="功能">
          <el-input v-model="info1.feature" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="价格">
          <el-input v-model="info1.price" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="所属类型">
          <el-select v-model="info1.typeName" placeholder="请选择器械类型">
            <el-option v-for="type in medicineTypes" :key="type.typeId" :label="type.typeName" :value="type.typeName">

            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="图片">
          <el-upload ref="uploadRef" class="upload-demo" action="http://localhost:8080/insertMedicine"
            :auto-upload="false" :data="{
                feature: info1.feature,
                medicineName: info1.medicineName,
                price: info1.price,
                typeName: info1.typeName
              }">
            <template #trigger>
              <el-button type="success">点击选择图片</el-button>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button class="ml-3" type="primary" @click="handleUploadAndRefresh">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!--编辑框 -->
    <el-dialog v-model="dialogVisible" title="编辑" width="30%">
      <el-form label-width="120px">
        <el-form-item label="药品名">
          <el-input v-model="info2.medicineName" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="功能">
          <el-input v-model="info2.feature" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="价格">
          <el-input v-model="info2.price" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="所属类型">
          <el-select v-model="info2.typeName" placeholder="请选择器械类型">
            <el-option v-for="type in medicineTypes" :key="type.typeId" :label="type.typeName" :value="type.typeName">

            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="图片">
          <el-upload ref="uploadRef" class="upload-demo" action="http://localhost:8080/updateMedicine"
            :auto-upload="false" :data="{
                feature: info2.feature,
                medicineName: info2.medicineName,
                price: info2.price,
                typeName: info2.typeName,
                medicineId: info2.medicineId
              }">
            <template #trigger>
              <el-button type="success">点击选择图片</el-button>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button class="ml-3" type="primary" @click="handleUploadAndRefresh">确定</el-button>
        </span>
      </template>
    </el-dialog>


    <el-pagination currentPage="currentPage" :page-sizes="[7]" page-size="7" :background="background"
      layout="total, sizes, prev, pager, next, jumper" :total="list.length" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </el-card>
</template>
<script>
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
export default {
  data() {
    return {
      currentPage: 1, //默认页码为1
      pagesize: 7, //默认一页显示 条
      dialogVisible: false,
      dialogVisible1: false,
      info2: {}, //修改数据
      info1: {}, //新增数据
      list: [],
      adg: [],
      dialogVisibleupdate: false,
      updateid: 0,
      medicineTypes: [],
    }
  },
  setup() {
  const uploadRef = ref(null)

  const handleSubmitUpload = () => {
    uploadRef.value.submit()
  }

  const handleSuccess = () => {
    setTimeout(() => {
      window.location.reload()
    }, 1000) // 延迟1秒刷新页面
  }

  const handleUploadAndRefresh = () => {
    handleSubmitUpload()
    handleSuccess()
  }

  return { uploadRef, handleUploadAndRefresh }
},

  //初始化工作
  mounted() {
    // 获取药品类型列表
    get('http://localhost:8080/allMedicineType').then((res) => {
      console.log(res)
      this.medicineTypes = res.data.data
      console.log(this.medicineTypes)
    })
    get('http://localhost:8080/allMedicine').then((res) => {
      console.log(res)
      this.list = res.data.data
    })
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    formatText(text, limit) { // 自定义函数，接收文本和限制长度作为参数
      if (text && text.length > limit) { // 判断文本是否需要截取
        return text.slice(0, limit) + '...'; // 截取并添加省略号
      }
      return text; // 不需要截取则直接返回原文本
    },
    del(data) {
      console.log(data.row.medicineId)
      get('http://localhost:8080/deleteMedicine', { medicineId: data.row.medicineId }).then(() => {
        ElMessage({
          message: '删除成功！',
          type: 'success'
        })
      })
      window.location.reload() //刷新
    },
    add() {
      this.dialogVisible1 = !this.dialogVisible1
    },
    handleClick(data) {
      this.info2 = data.row
      this.dialogVisible = !this.dialogVisible
    },
    handleSizeChange: function (size) {
      //一页显示多少条
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      //页码更改方法
      this.currentPage = currentPage
    },
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  height: 95%;
}
</style>