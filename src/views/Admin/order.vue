<template>
  <el-card class="box-card">
    <el-table :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="detailId" label="订单编号" width="300" />
      <el-table-column prop="userId" label="用户Id" width="200" />
      <el-table-column prop="medicineName" label="物品明细" width="200" />
      <el-table-column prop="count" label="数量" width="200" />
      <el-table-column prop="price" label="单价" width="200" />
      <el-table-column prop="totalPrice" label="总价" width="200" /> 
      <el-table-column prop="time" label="下单时间" width="200" />
    </el-table>

    <el-pagination currentPage="currentPage" :page-sizes="[10]" page-size="10" :background="background"
      layout="total, sizes, prev, pager, next, jumper" :total="list.length" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </el-card>
</template>
<script>
import { get } from '@/utils/request'
export default {
  data() {
    return {
      currentPage: 1, //默认页码为1
      pagesize: 11, //默认一页显示 条
      dialogVisible: false,
      dialogVisible1: false,
      list: [],
    }
  },
  //初始化工作
  mounted() {
    get('http://localhost:8080/allOrderDetail').then((res) => {
      this.list = res.data.data;
      // 新增代码，计算商品总价
      this.list.forEach(item => {
        item.totalPrice = item.count * item.price;
      });
    })
  },
  methods: {

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