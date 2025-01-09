<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats">
      <div class="stat-card active-clients">
        <div class="text">
          <h3>ACTIVE CLIENTS</h3>
          <p class="clients">{{ activeUserCountMax }}</p>
        </div>
        <img src="https://img.icons8.com/?size=60&id=0N99feShYSBW&format=png" alt="Users" />
      </div>

      <div class="stat-card total-revenue">
        <div class="text">
          <h3>TOTAL REVENUE</h3>
          <p class="revenue">Ksh {{ totalRevenue }}</p>
        </div>
        <img src="https://img.icons8.com/?size=80&id=LFXbaiQfZuLS&format=png" alt="Total Revenue" />
      </div>

      <div class="stat-card payments-made">
        <div class="text">
          <h3>PAYMENTS MADE</h3>
          <p class="payments">{{ totalPayments }}</p>
        </div>
        <img src="https://img.icons8.com/?size=80&id=DZMTS6QhaBfc&format=png" alt="Payments Made" />
      </div>
    </div>

    <div class="charts">
      <div class="chart chart-daily-stats">
        <h3>DAILY STATS</h3>
        <div class="chart-container">
          <canvas id="lineChart"></canvas>
        </div>
      </div>
      <div class="chart chart-active-users">
        <h3>ACTIVE USERS</h3>
        <div class="chart-container">
          <canvas id="growthRateChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "Dashboard",
  data() {
    return {
      stats: [],
      filteredStats: [],
      activeUserCountMax: 0,
      totalRevenue: 0,
      totalPayments: 0,
      charts: {
        lineChart: null,
        growthRateChart: null,
      },
    };
  },
  methods: {
    async fetchStats() {
      try {
        const token = "YOUR_ACTUAL_TOKEN_HERE"; // Replace with your actual token
        const requestBody = {
          pageNum: 1,
          pageSize: 100, // Fetch a large number to cover all data
          beginAt: "2024-01-01",
          endAt: "2025-12-19",
        };

        const response = await axios.post("/admin/dailyStatList", requestBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const stats = response.data?.data?.list || [];
        this.stats = stats;
        this.filteredStats = [...stats];

        // Calculate active clients and total revenue
        this.activeUserCountMax = stats.reduce(
          (max, stat) => max + (stat.activeUserCountMax || 0),
          0
        );
        this.totalRevenue = stats.reduce(
          (sum, stat) => sum + (stat.revenue || 0),
          0
        );

        this.updateCharts();
      } catch (error) {
        console.error("Error fetching stats:", error.response || error.message);
      }
    },
    async fetchPayments() {
      try {
        const token = "YOUR_ACTUAL_TOKEN_HERE"; // Replace with your actual token
        const requestBody = {
          pageNum: 0, // Adjusted to start at 0
          pageSize: 100,
          beginAt: "2024-12-01 00:00:00", // Added time component
          endAt: "2025-12-19 00:00:00",  // Added time component
        };

        const response = await axios.post("/admin/paymentList", requestBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);

        // Ensure the response structure is as expected
        if (response.data?.data) {
          this.totalPayments = response.data.data.totalPayments || 0;
        } else {
          console.warn("Unexpected response structure:", response.data);
          this.totalPayments = 0;
        }
      } catch (error) {
        console.error(
          "Error fetching payment info:",
          error.response?.data || error.message || error
        );
        // Optionally display an error message to the user
        alert("Failed to fetch payment info. Please try again later.");
      }
    },

    updateCharts() {
      this.updateLineChart();
      this.updateGrowthChart();
    },

    updateLineChart() {
      const labels = this.filteredStats.map((stat) =>
        new Date(stat.statDate).toLocaleDateString()
      );
      const revenueData = this.filteredStats.map((stat) => stat.revenue || 0);
      const newUserData = this.filteredStats.map((stat) => stat.newUserCount || 0);

      this.createOrUpdateChart("lineChart", labels, [
        { label: "Revenue", data: revenueData, borderColor: "#007bff" },
        { label: "New Users", data: newUserData, borderColor: "#28a745" },
      ]);
    },

    updateGrowthChart() {
      const labels = this.filteredStats.map((stat) =>
        new Date(stat.statDate).toLocaleDateString()
      );
      const activeMinData = this.filteredStats.map(
        (stat) => stat.activeUserCountMin || 0
      );
      const activeMaxData = this.filteredStats.map(
        (stat) => stat.activeUserCountMax || 0
      );

      this.createOrUpdateChart("growthRateChart", labels, [
        { label: "Active Min", data: activeMinData, borderColor: "#ff5733" },
        { label: "Active Max", data: activeMaxData, borderColor: "#ffc300" },
      ]);
    },

    createOrUpdateChart(chartId, labels, datasets) {
      const ctx = document.getElementById(chartId)?.getContext("2d");
      if (!ctx) {
        console.error(`Canvas with ID ${chartId} not found`);
        return;
      }

      if (this.charts[chartId]) this.charts[chartId].destroy();

      this.charts[chartId] = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: datasets.map((set) => ({
            ...set,
            backgroundColor: set.borderColor + "33", // Add transparency
            fill: true,
          })),
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            x: { title: { display: true, text: "Date" } },
            y: { title: { display: true, text: "Values" }, beginAtZero: true },
          },
        },
      });
    },
  },
  mounted() {
    this.fetchStats();
    this.fetchPayments();
  },
};
</script>



<style scoped>
.dashboard {
  
  margin-left: 250px;
  padding: 20px;
  overflow: hidden;
  height: 565px;
  width: 100%;
}

.stats {
 
  display: flex;
  justify-content: space-between;
 margin-top: -40px;
  padding: 40px;
  margin-left: -25px;
}

.stat-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 15px;
  margin: 0 10px;
  text-align: left;
  border-radius: 8px;
  background-color: #f4f4f4;
  color: #333;
  height: 80px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 500px;
}

.stat-card img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-top: 10px;
}

.stat-card h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #5d678a;
}

.stat-card p {
  font-size: 20px;
  font-weight: bold;
}

.active-clients {
  background-color: #f8a541;
  color: grey;
}

.total-revenue {
  background-color: #47d3f8;
  color: #0077ff;
}

.payments-made {
  background-color: #f8768e;
  color: #fff;
}

.charts {
 margin-left: -20px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  width: 850px;
  height: 100%;
}

.chart {
 
  width: 550px;
  flex: 1;
  margin: 0 30px;
  text-align: center;
}

.chart-container {
  margin-left: -30px;
  margin-top: 3px;
  position: relative;
  width: 500px;
  height: 800px;
}
</style>
