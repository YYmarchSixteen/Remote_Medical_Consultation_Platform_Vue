<template>
  <div class="container" ref="scrollContainer" style="max-height: 800px; overflow-y: auto;">
    <h1>商品列表</h1>
    <el-button type="primary" @click="showDialog2();addForm=scope.row" size="small">新增商品</el-button>
    <br><br>
    <el-table :data="products" border stripe>
      <el-table-column prop="medicineName" label="商品" width="150"></el-table-column>
      <el-table-column prop="picture" label="商品图片" width="150">
        <template #default="scope">
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:8081/medicine/uploadPicture'"
            :show-file-list="false"
            :data="{ medicineId: scope.row.medicineId }"
            :on-success="re"
            name="picture"
          >
            <img v-if="scope.row.picture" :src="scope.row.picture" class="avatar" :width="100" :height="100"
                 alt="productsPic">
            <img v-else-if="nullPic" :src="nullPic" class="avatar" :width="100" :height="100" alt="productsPic">
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="商品类型" width="90"></el-table-column>
      <el-table-column prop="price" label="价格/元" width="100"></el-table-column>
      <el-table-column prop="feature" label="功效" width="500"></el-table-column>
      <el-table-column prop="count" label="剩余库存" width="100"></el-table-column>
      <el-table-column prop="rx" label="性质" width="100">
        <template v-slot="scope">
          <span v-if="scope.row.rx === 1">处方药</span>
          <span v-else-if="scope.row.rx === 0">非处方药</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button type="success" size="small" @click="adjustStock(scope.row)">
            库存调整
          </el-button>
          <el-button type="danger" size="small" @click="disableProduct(scope.row)">
            删除商品
          </el-button>
          <el-button type="primary" @click="showDialog1();" size="small">商品调价</el-button>
          <el-dialog title="商品调价" v-model="dialogVisible1">
            <el-form ref="updateForm" :model="updateForm" label-width="100px">
              <el-form-item label="价格" prop="price">
                <el-input v-model="updateForm.price"></el-input>
              </el-form-item>
            </el-form>
            <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="updateProduct(scope.row)">确定</el-button>
      </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="库存调整" v-model="dialogVisible3">
      <el-form ref="adjustForm" :model="adjustForm" label-width="100px">
        <el-form-item label="调整数量" prop="count">
          <el-input v-model.number="adjustForm.count"></el-input>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
    <el-button @click="dialogVisible3 = false">取消</el-button>
    <el-button type="primary" @click="submitAdjustment">确定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="新增商品" v-model="dialogVisible2">
      <el-form ref="addForm" :model="addForm" label-width="100px">
        <el-form-item label="商品名" prop="medicineName">
          <el-input v-model="addForm.medicineName"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="功效" prop="feature">
          <el-input v-model="addForm.feature"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择类型">
            <el-option label="感冒用药" value="感冒用药"></el-option>
            <el-option label="心脑血管用药" value="心脑血管用药"></el-option>
            <el-option label="抗生素" value="抗生素"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性质" prop="rx">
          <el-select v-model="addForm.rx" placeholder="请选择性质">
            <el-option label="处方药" value="1"></el-option>
            <el-option label="非处方药" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span id="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="addProduct">添加</el-button>
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
      products: [],
      dialogVisible1: false,
      dialogVisible2: false,
      nullPic: 'https://remote-medical-consultation-platform-database.oss-cn-beijing.aliyuncs.com/a8f7e7970a1f894b30805a316527d60.png',
      updateForm: {
        price: '',
        medicineId: ''
      },
      addForm: {
        medicineName: '',
        price: '',
        feature: '',
        type: '',
        rx: ''
      },
      adjustForm: {
        count: 0,
        medicineId: ''
      },
      dialogVisible3: false

    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8081/medicine/all')
        this.products = response.data.data
      } catch (error) {
        console.error('Error fetching notices:', error)
      }
    },
    async disableProduct(product) {
      try {
        await axios.delete(`http://localhost:8081/medicine/delMedicine?medicineId=${product.medicineId}`)
        this.$message.success('当前商品已删除')
        this.fetchProducts()
      } catch (error) {
        console.error('Error disabling Product:', error)
      }
    },
    showDialog1() {
      this.dialogVisible1 = true
    },
    showDialog2() {
      this.dialogVisible2 = true
    },
    async updateProduct(product) {
      try {
        const params = new URLSearchParams()
        params.append('price', this.updateForm.price)
        params.append('medicineId', product.medicineId)
        axios.put('http://localhost:8081/medicine/changePrice', params)
        this.$message.success('调价成功')
        this.dialogVisible1 = false
        await this.fetchProducts()
        window.location.reload()
      } catch (error) {
        console.error('Error adding Product:', error)
      }
    },
    adjustStock(product) {
      this.adjustForm.medicineId = product.medicineId
      this.dialogVisible3 = true
    },
    async submitAdjustment() {
      try {
        const params = new URLSearchParams()
        params.append('count', this.adjustForm.count)
        params.append('medicineId', this.adjustForm.medicineId)
        await axios.put('http://localhost:8081/medicine/changeCount', params)
        this.$message.success('库存调整成功')
        this.dialogVisible3 = false
        await this.fetchProducts()
      } catch (error) {
        console.error('Error adjusting stock:', error)
      }
    },
    async addProduct() {
      try {
        const params = new URLSearchParams()
        params.append('medicineName', this.addForm.medicineName)
        params.append('price', this.addForm.price)
        params.append('feature', this.addForm.feature)
        params.append('type', this.addForm.type)
        params.append('rx', this.addForm.rx)
        axios.post('http://localhost:8081/medicine/addMedicine', params)
        this.$message.success('新增成功')
        this.dialogVisible2 = false
        await this.fetchProducts()
      } catch (error) {
        console.error('Error adding Product:', error)
      }
    },
    re() {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  max-width: 1510px;
}
</style>
