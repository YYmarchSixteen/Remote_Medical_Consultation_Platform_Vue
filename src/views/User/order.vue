<template>
  <div>
    <div class="header">
      <Header></Header>
    </div>
    <div class="header1"></div>
    <main>
      <div class="container">
        <table id="shoppingcartinfo">
          <thead>
          <tr>
            <th width="600px" height="42px">商品图片</th>
            <th width="100px" height="42px">商品名称</th>
            <th width="235px" height="42px">单价</th>
            <th width="130px" height="42px">数量</th>
            <th width="150px" height="42px">小计</th>
            <th width="200px" height="42px">支付时间</th>
            <th width="200px" height="42px">订单编号</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in medicine" :key="item.detailId">
            <td><img :src="item.picture" style="padding-left: 230px;" width="150" height="150" alt="Product Image"></td>
            <td style="padding-left: 10px;font-size: large">{{ item.medicineName }}</td>
            <td style="padding-left: 110px;font-size: large">¥{{ item.price }}</td>
            <td style="padding-left: 55px;">{{ item.count }}</td>
            <td style="padding-left: 65px;color: #e5880e;font-size: large">¥{{ item.count * item.price }}</td>
            <td style="padding-left: 65px;">{{ formatDate(item.payTime) }}</td>
            <td style="padding-left: 65px;">{{ item.flag }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/views/userLayout/Header/header.vue'

export default {
  components: { Header },
  data() {
    return {
      medicine: [],
      detailId: ''
    }
  },
  mounted() {
    this.fetchCartData()
  },
  methods: {
    fetchCartData() {
      axios.get(`http://localhost:8081/detail/findById?userId=1`)
        .then(response => {
          this.medicine = response.data.data
          console.log(this.medicine)
        })
        .catch(error => {
          console.error('Error fetching order data:', error)
        })
    },
    formatDate(payTime) {
      const date = new Date(payTime)
      const adjustedDate = new Date(date.getTime() - 8 * 60 * 60 * 1000)
      const year = adjustedDate.getFullYear()
      const month = String(adjustedDate.getMonth() + 1).padStart(2, '0')
      const day = String(adjustedDate.getDate()).padStart(2, '0')
      const hours = String(adjustedDate.getHours()).padStart(2, '0')
      const minutes = String(adjustedDate.getMinutes()).padStart(2, '0')
      const seconds = String(adjustedDate.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑", serif;
  list-style: none;
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

body {
  background: #f5f5f5;
  height: 100%;
}

.header1 {
  font-size: 12px;
  border-bottom: 2px solid #ffffff;
  background: #fff;
  color: #000000;
  position: relative;
  z-index: 20;
  height: 100px;
}

.box_head span {
  position: absolute;
  top: -20px;
  left: 372px;
  height: 40px;
  width: 482px;
  line-height: 40px;
  text-align: center;
  display: block;
  background-color: #f5f5f5;
  font-size: 30px;
}

#box ul {
  margin-right: -14px;
  overflow: hidden;
}

#box li {
  width: 234px;
  float: left;
  margin-right: 14px;
  padding: 24px 0 20px;
  background: #FFF;
  text-align: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 14px;
}

.pro_name a {
  color: #333;
}


.car .check i {
  color: #fff;
  display: inline-block;

  width: 18px;
  height: 18px;
  line-height: 18px;
  border: 1px solid #e0e0e0;
  margin-left: 24px;
  background-color: #fff;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: pointer;
  font-family: "iconfont", serif;
}

.car .img img {
  display: block;
  width: 80px;
  height: 80px;
  margin: 3px auto;
}

.car .name span {
  line-height: 1;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.car .price span {
  color: #ff6700;
  font-size: 16px;
}

.car .ctrl a {
  font-size: 20px;
  cursor: pointer;
  display: block;
  width: 26px;
  height: 26px;
  margin: 30px auto;
  line-height: 26px;
}

.car .ctrl a:hover {
  color: #FFF;
  background: #ff6700;
  border-radius: 50%;
}

</style>