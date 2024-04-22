<template>
  <body>
  <div class="header">
    <Header></Header>
  </div>
  <div class="all-medicines">

    <div id="all">
      <div v-if="medicine">
        <div style="clear: both;"></div>
        <div id="content">
          <div class="a1">
            <img class="big" :src="medicine.picture" alt="Medicine Picture">
          </div>
          <div class="a2">
            <h2>{{ medicine.medicineName }}</h2>
            <div class="a21">
              <div class="a211">
                <span class="color">售价</span>
                <span class="prices">￥{{ medicine.price }}</span>
                <span class="shic">市场价<span class="prices2">￥{{ medicine.price * 2 }}</span></span>
                <span class="yis">已售6264件</span>
              </div>
              <div class="a22">
                <p></p>
                <span class="color">材料</span>
                <span class="neir">{{ medicine.feature }}</span>
                <p></p>
                <p></p>
                <span class="color">备注</span>
                <span class="neir">{{ medicine.type }}</span>
              </div>
              <div class="a23">
                <p></p>
                <span class="color">配送说明</span>
                <p>港澳台地区、西藏、新疆、内蒙古、宁夏、青海不包邮</p>
              </div>
              <div class="a24">
              <span class="color">数量
                <span class="num">
                <el-input-number v-model="count" @change="handleChange" :min="1" :max="10" label="描述文字">
                </el-input-number>
                </span>
              </span>
                <p></p>
              </div>
              <div class="a25">
                <button class="a25color1" @click="addToCart">加入购物车</button>
                <button class="a25color2" @click="pay">立即购买</button>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import axios from 'axios'
import Header from '@/views/userLayout/Header/header.vue'

export default {
  components: { Header },
  data() {
    return {
      medicine: null,
      medicineId: null,
      count: ''
    }
  },
  mounted() {
    this.medicineId = localStorage.getItem('medicineId')
    this.fetchMedicineDetails()
  },
  methods: {
    fetchMedicineDetails() {
      axios.get(`http://localhost:8081/medicine/findById?medicineId=${this.medicineId}`)
        .then(response => {
          this.medicine = response.data.data
        })
        .catch(error => {
          console.error('Error fetching medicine details:', error)
        })
    },
    handleChange(value) {
      console.log(value)
    },
    async addToCart() {
      try {
        const params = new URLSearchParams()
        params.append('userId', 1)
        params.append('medicineId', this.medicineId)
        params.append('count', this.count)
        await axios.post('http://localhost:8081/cart/addCart', params)
        alert('商品已添加入购物车')
      } catch (error) {
        console.error('Error updating doctor:', error)
        alert('添加购物车失败')
      }
    },
    async pay() {
      try {
        const params = new URLSearchParams()
        params.append('userId', 1)
        params.append('medicineId', this.medicineId)
        params.append('count', this.count)
        await axios.post('http://localhost:8081/detail/add', params)
        alert('购买成功')
      } catch (error) {
        alert('购买失败')
      }
    }
  }
}
</script>
<style scoped>
.all-medicines {
  margin-top: 10%
}

.num {
  margin-left: 50px;
}

iframe {
  width: 1200px;
  margin: auto;
}

.all iframe {
  /* border: 2px solid red; */
}

#content {
  /* 	border: 1px solid red; */
  width: 1400px;
  margin: auto;
}

#content .a1 {
  float: left;
  margin-left: 10px;
}

#content .a1 .big {
  /* float: left; */
  width: 450px;
  height: 400px;
}

#content .a11 ul li {
  list-style: none;
  float: left;
  margin: 20px 15px;
}

.a11 ul li img {
  border: 3px white solid;
  width: 80px;
  height: 80px;
}

.a11 ul li img:hover {
  border: 3px #FF4F0D solid;
}

.a2 {
  float: left;
  margin-left: 90px;
  width: 800px;
}

.a21 .color {
  color: #758188;
}

.a21 .a211 {
  background-color: #F2F5F8;
  color: #758188;
}

.a21 .a211 .prices, .shic {
  margin-left: 40px;
}

.a21 .a211 .prices {
  color: #FF4F0D;
  font-size: 35px;
  font-weight: bold;
}

.a21 .a211 .prices2 {
  text-decoration: line-through;
}

.a21 .a211 .yis {
  margin-left: 230px;
}

.a22 {
  background-color: #F6F9FB;
}

.a22 span, p {
  margin-top: 10px;
}

.a22 .neir {
  margin-left: 50px;
}

.a23 {
  margin-top: 10px;
}

.a24 {
  margin-top: 10px;
}

.a25 {
  margin-top: 30px;
}

.a25 button {
  display: inline-block;
  width: 200px;
  height: 60px;
  border-radius: 30px;
  margin-left: 30px;
}

.a25 .a25color1 {
  background-color: #FFEEE8;
  color: #FF4F0D;
  font-size: 20px;
  font-weight: bolder;
  border: 1px #FF4F0D solid;
}

.a25 .a25color2 {
  background-color: #FF4F0D;
  color: white;
  font-size: 20px;
  font-weight: bolder;
  border: 1px #FF4F0D solid;
}
</style>