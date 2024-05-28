<template>
  <div class="all-medicines">
    <div class="header">
      <Header></Header>
    </div>
    <div class="medicine-list">
      <div v-for="(medicine, index) in medicines" :key="medicine.medicineId" :class="{ 'medicine': true, 'last-in-row': (index + 1) % 5 === 0 }">
        <img :src="medicine.picture" :alt="medicine.medicineName" class="medicine-image">
        <div class="medicine-info">
          <h2 class="medicine-name">{{ medicine.medicineName }}</h2>
          <p class="medicine-price">价格: {{ medicine.price }}元</p>
          <p class="medicine-type">{{ medicine.type }}</p>
          <el-button @click="addToCart(medicine)" type="primary" class="add-to-cart-btn">加入购物车</el-button>
          <el-button @click="detail(medicine.medicineId)" type="success" class="detail-btn">查看详情</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/views/userLayout/Header/header.vue';
import { ElButton } from 'element-plus';

export default {
  components: { Header, ElButton },
  data() {
    return {
      medicines: []
    };
  },
  mounted() {
    this.fetchMedicines();
    sessionStorage.getItem('userId')
  },
  methods: {
    fetchMedicines() {
      axios.get('http://localhost:8081/medicine/all')
        .then(response => {
          this.medicines = response.data.data;
        })
        .catch(error => {
          console.error('Error fetching medicines:', error);
        });
    },
    async addToCart(medicine) {
      try {
        const params = new URLSearchParams()
        params.append('userId', sessionStorage.getItem('userId'))
        params.append('medicineId', medicine.medicineId)
        params.append('count', 1)
        await axios.post('http://localhost:8081/cart/addCart', params)
        alert('商品已添加入购物车')
      } catch (error) {
        console.error('Error updating doctor:', error)
        alert('添加购物车失败')
      }
    },
    detail(medicineId) {
      localStorage.setItem('medicineId', medicineId);
      this.$router.push('detail');
    }

  }
};
</script>

<style scoped>
.all-medicines {
  max-width: 80%;
  margin: 5% auto;
  padding: 20px;
}

.medicine {
  display: inline-block;
  margin-bottom: 20px;
  width: 19%;
  margin-right: 1%;
  border: 1px solid #ccc;
}


.medicine:last-child {
  margin-right: 0;
}

.last-in-row {
  margin-right: 0;
}

.medicine-image {
  width: 50%;
  height: auto;
}

.medicine-info {
  padding: 10px;
}

.medicine-name {
  margin-top: 0;
}

.medicine-price {
  margin-bottom: 10px;
}
</style>
