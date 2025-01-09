<template>
  <div class="daily-stats">
    <!-- Search Filters -->
    <div class="search-container">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date" v-model="startDate" />
      <label for="end-date">End Date:</label>
      <input type="date" id="end-date" v-model="endDate" />
      <button @click="filterByDate">Filter</button>
    </div>

    <!-- Charts Section -->
    <div class="charts">
      <div class="chart" v-for="chart in chartConfigs" :key="chart.id">
        <h3>{{ chart.title }}</h3>
        <div class="chart-container">
          <canvas :id="chart.id"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "DailyStats",
  data() {
    return {
      stats: [],
      filteredStats: [],
      startDate: "",
      endDate: "",
      charts: {},
      chartConfigs: [
        { id: "lineChart", title: "Daily Stats" },
        { id: "growthRateChart", title: "ACTIVE USERS" },
        { id: "rxBitChart", title: "rxBitMin / rxBitMax" },
        { id: "txBitChart", title: "txBitMin / txBitMax" },
        { id: "syncFailedChart", title: "ProfileSyncMktFailed / LoginMktFailed" },
        { id: "subCallChart", title: "SubCalls Count" },
        { id: "subPayChart", title: "SubPay Counts" },
      ],
    };
  },
  methods: {
    async fetchStats() {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
          alert("You are not logged in. Please log in first.");
          return;
        }

        const requestBody = {
          beginAt: this.getStartOfLastThreeMonths(),
          endAt: new Date().toISOString().split("T")[0],
        };

        const response = await axios.post("/admin/dailyStatList", requestBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token in Authorization header
          },
        });

        this.stats = response.data.data.list || [];
        this.filterForLastThreeMonths();
        this.updateAllCharts();
      } catch (error) {
        console.error("Error fetching stats:", error);
        alert("Failed to fetch stats. Please try again later.");
      }
    },
    filterForLastThreeMonths() {
      const start = new Date(this.getStartOfLastThreeMonths()).setHours(0, 0, 0, 0);
      const end = new Date().setHours(23, 59, 59, 999);

      this.filteredStats = this.stats.filter((stat) => {
        const date = new Date(stat.statDate).getTime();
        return date >= start && date <= end;
      });
    },
    filterByDate() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate).setHours(0, 0, 0, 0);
        const end = new Date(this.endDate).setHours(23, 59, 59, 999);

        this.filteredStats = this.stats.filter((stat) => {
          const date = new Date(stat.statDate).getTime();
          return date >= start && date <= end;
        });
        this.updateAllCharts();
      }
    },
    getStartOfLastThreeMonths() {
      const date = new Date();
      date.setMonth(date.getMonth() - 2);
      date.setDate(1);
      return date.toISOString().split("T")[0];
    },
    getDateLabels() {
      return this.filteredStats.map((stat) => {
        const date = new Date(stat.statDate);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      });
    },
    aggregateDailyData(field) {
      const aggregated = {};
      this.filteredStats.forEach((stat) => {
        const date = `${new Date(stat.statDate).getDate()}/${
          new Date(stat.statDate).getMonth() + 1
        }`;
        aggregated[date] = (aggregated[date] || 0) + stat[field];
      });
      return this.getDateLabels().map((date) => aggregated[date] || 0);
    },
    updateAllCharts() {
      this.updateChart(
        "lineChart",
        this.getDateLabels(),
        [
          this.aggregateDailyData("revenue"),
          this.aggregateDailyData("newUserCount"),
        ],
        ["Revenue", "New Users"],
        ["#007bff", "#28a745"]
      );
      this.updateChart(
        "growthRateChart",
        this.getDateLabels(),
        [
          this.aggregateDailyData("activeUserCountMin"),
          this.aggregateDailyData("activeUserCountMax"),
        ],
        ["Active Min", "Active Max"],
        ["#007bff", "#28a745"]
      );
      this.updateChart(
        "rxBitChart",
        this.getDateLabels(),
        [
          this.aggregateDailyData("rxBitMin"),
          this.aggregateDailyData("rxBitMax"),
        ],
        ["rxBitMin", "rxBitMax"],
        ["#ff5733", "#ffc300"]
      );
      this.updateChart(
        "txBitChart",
        this.getDateLabels(),
        [
          this.aggregateDailyData("txBitMin"),
          this.aggregateDailyData("txBitMax"),
        ],
        ["txBitMin", "txBitMax"],
        ["#33ffbd", "#33a1ff"]
      );
      this.updateChart(
        "syncFailedChart",
        this.getDateLabels(),
        [
          this.aggregateDailyData("profileSyncMktFailedCount"),
          this.aggregateDailyData("loginSyncMktFailedCount"),
        ],
        ["ProfileSyncMktFailed", "LoginMktFailed"],
        ["#ff33a6", "#800080"]
      );
      this.updateChart(
        "subCallChart",
        this.getDateLabels(),
        [
          this.aggregateDailyData("subCallSuccCount"),
          this.aggregateDailyData("subCallFailedCount"),
        ],
        ["SubCallSuccCount", "SubCallFailedCount"],
        ["#33ff57", "#ff3333"]
      );
      this.updateChart(
        "subPayChart",
        this.getDateLabels(),
        [
          this.aggregateDailyData("subPaySuccCount"),
          this.aggregateDailyData("subPayFailedCount"),
        ],
        ["SubPaySuccCount", "SubPayFailedCount"],
        ["#008080", "#ff4500"]
      );
    },
    updateChart(chartId, labels, dataSets, legends, colors) {
      const datasets = dataSets.map((data, index) => ({
        label: legends[index],
        data,
        borderColor: colors[index],
        backgroundColor: `${colors[index]}33`,
        fill: true,
      }));

      if (this.charts[chartId]) {
        this.charts[chartId].destroy();
      }

      const ctx = document.getElementById(chartId).getContext("2d");
      this.charts[chartId] = new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            x: { title: { display: true, text: "Date (DD/MM)" } },
            y: { title: { display: true, text: "Values" }, beginAtZero: true },
          },
        },
      });
    },
    calculateTotal(field) {
      return this.filteredStats.reduce((total, stat) => total + stat[field], 0);
    },
  },
  mounted() {
    this.fetchStats();
  },
};
</script>

  
  
  
  
  <style scoped>
  .daily-stats {
    margin-left: 300px;
    padding: 20px;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-container label {
    margin-right: 10px;
  }
  
  .search-container input {
    margin-right: 20px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-container button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-container button:hover {
    background-color: #0056b3;
  }
  
  .charts {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .chart {
    flex: 1;
    min-width: 400px;
  }
  
  .chart-container {
    position: relative;
    width: 100%;
    height: 300px;
  }
  </style>
  