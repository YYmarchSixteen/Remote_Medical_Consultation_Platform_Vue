<template>
  <div>
    <div class="header">
      <Header></Header>
    </div>
    <div class="header1"></div>
    <main>
      <div class="container">
        <h1>销售报表</h1>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="fetchSalesData"
        ></el-date-picker>
        <el-table :data="salesData" style="width: 100%">
          <el-table-column prop="payTime" label="日期" width="180" :formatter="formatDate"></el-table-column>
          <el-table-column prop="order_count" label="订单数量" width="180"></el-table-column>
          <el-table-column prop="total_cost" label="销售额" width="180"></el-table-column>
        </el-table>
        <div id="salesChart" style="height: 400px;"></div>
        <h1>药品订单报告</h1>
        <div id="medicineOrderChart" style="height: 400px"></div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts';

export default {
  data() {
    return {
      dateRange: [],
      salesData: [],
      orderReport: []
    }
  },
  methods: {
    fetchSalesData() {
      if (this.dateRange && this.dateRange.length === 2) {
        const [startDate, endDate] = this.dateRange;
        const formattedStartDate = startDate.toISOString().slice(0, 10);
        const formattedEndDate = endDate.toISOString().slice(0, 10);
        axios.get('http://localhost:8081/medicine/sales_report', {
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate
          }
        })
          .then(response => {
            this.salesData = response.data;
            this.renderSalesChart();
          })
          .catch(error => {
            console.error('Error fetching sales data:', error);
          });
      } else {
        console.error('Invalid date range:', this.dateRange);
      }
    },
    fetchOrderReportData() {
      axios.get('http://localhost:8081/medicine/sales_report2')
        .then(response => {
          this.orderReport = response.data;
          this.renderOrderReportChart();
        })
        .catch(error => {
          console.error("There was an error fetching the data:", error);
        });
    },
    formatDate(row) {
      return new Date(row.payTime).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    },
    renderSalesChart() {
      const chart = echarts.init(document.getElementById('salesChart'));
      const dates = this.salesData.map(data => new Date(data.payTime).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }));
      const orderCounts = this.salesData.map(data => data.order_count);
      const salesAmounts = this.salesData.map(data => data.total_cost);

      const option = {
        title: {
          text: '销售报表'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单数量', '销售额']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '订单数量',
            type: 'line',
            data: orderCounts
          },
          {
            name: '销售额',
            type: 'line',
            data: salesAmounts
          }
        ]
      };

      chart.setOption(option);
    },
    renderOrderReportChart() {
      const chartDom = document.getElementById('medicineOrderChart');
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '药品订单报告'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单数量', '总成本']
        },
        xAxis: {
          type: 'category',
          data: this.orderReport.map(item => item.medicineName)
        },
        yAxis: [
          {
            type: 'value',
            name: '订单数量'
          },
          {
            type: 'value',
            name: '总成本',
            position: 'right'
          }
        ],
        series: [
          {
            name: '订单数量',
            type: 'bar',
            data: this.orderReport.map(item => item.order_count)
          },
          {
            name: '总成本',
            type: 'line',
            yAxisIndex: 1,
            data: this.orderReport.map(item => item.total_cost)
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.fetchSalesData();
    this.fetchOrderReportData();
  }
}
</script>
<style scoped>
.container {
  margin: 20px auto;
  max-height: 90vh;
  overflow-y: auto;
}
</style>