<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats">
      <div class="stat-card active-clients">
        <div class="text">
          <h3>ACTIVE CLIENTS</h3>
          <p class="clients">10,000</p>
        </div>
        <img src="https://img.icons8.com/?size=60&id=0N99feShYSBW&format=png" alt="Users" />
      </div>

      <div class="stat-card total-revenue">
        <div class="text">
          <h3>TOTAL REVENUE</h3>
          <p class="revenue">Ksh 550,000</p>
        </div>
        <img src="https://img.icons8.com/?size=80&id=LFXbaiQfZuLS&format=png" alt="Total Revenue" />
      </div>

      <div class="stat-card payments-made">
        <div class="text">
          <h3>PAYMENTS MADE</h3>
          <p class="payments">200,000</p>
        </div>
        <img src="https://img.icons8.com/?size=80&id=DZMTS6QhaBfc&format=png" alt="Payments Made" />
      </div>
    </div>

    <div class="charts">
      <div class="chart monthly-revenue">
        <h3>MONTHLY REVENUE</h3>
        <div class="chart-container">
          <canvas id="lineChart"></canvas>
        </div>
      </div>
      <div class="chart customer-growth">
        <h3>CUSTOMER GROWTH RATE</h3>
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
      stats: [], // Holds all data from API
      filteredStats: [], // Filtered data for charts
      chart: null, // Monthly revenue chart instance
      growthChart: null, // Customer growth rate chart instance
    };
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get(
          "https://test.api.hotspot.etnet.co.ke/admin/dailyStatList"
        );
        console.log("API Response:", response);
        this.stats = response.data.data || []; // Access the array inside 'data'
        this.filteredStats = this.stats; // Set filtered stats to all stats initially
        this.updateChart(); // Update revenue chart
        this.updateGrowthChart(); // Update growth chart
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    },
    updateChart() {
      const labels = this.filteredStats.map((stat) => {
        const date = new Date(stat.statDate);
        return date.getDate();
      });

      const revenueData = this.filteredStats.map((stat) => stat.revenue);
      const newUserData = this.filteredStats.map((stat) => stat.newUserCount);

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById("lineChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Revenue",
              data: revenueData,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              fill: true,
            },
            {
              label: "New Users",
              data: newUserData,
              borderColor: "#28a745",
              backgroundColor: "rgba(40, 167, 69, 0.1)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const index = tooltipItems[0].dataIndex;
                  const fullDate = new Date(this.filteredStats[index].statDate);
                  return fullDate.toLocaleString();
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Day",
              },
            },
            y: {
              title: {
                display: true,
                text: "Values",
              },
              beginAtZero: true,
            },
          },
        },
      });
    },
    updateGrowthChart() {
      const labels = this.filteredStats.map((stat) => {
        const date = new Date(stat.statDate);
        return date.getDate();
      });

      const activeUserCountMinData = this.filteredStats.map(
        (stat) => stat.activeUserCountMin
      );
      const activeUserCountMaxData = this.filteredStats.map(
        (stat) => stat.activeUserCountMax
      );

      if (this.growthChart) {
        this.growthChart.destroy();
      }

      const ctx = document.getElementById("growthRateChart").getContext("2d");
      this.growthChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Active Min",
              data: activeUserCountMinData,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              fill: true,
            },
            {
              label: "Active Max",
              data: activeUserCountMaxData,
              borderColor: "#28a745",
              backgroundColor: "rgba(40, 167, 69, 0.1)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const index = tooltipItems[0].dataIndex;
                  const fullDate = new Date(this.filteredStats[index].statDate);
                  return fullDate.toLocaleString();
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Day",
              },
            },
            y: {
              title: {
                display: true,
                text: "Active Users",
              },
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  mounted() {
    this.fetchStats();
  },
};
</script>

<style scoped>
.dashboard {
  margin-left: 300px ;
  padding: 20px;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
  padding: 40px;
}

.stat-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 20px;
  margin: 0 10px;
  text-align: left;
  border-radius: 8px;
  background-color: #f4f4f4;
  color: #333;
  height: 100px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.stat-card .text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.active-clients {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f8a541;
  color: grey;
}

.total-revenue {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #47d3f8;
  color: #0077ff;
}

.payments-made {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f8768e;
  color: #fff;
}


.charts {
  display: flex;
  justify-content: space-between;
}

.chart {
  flex: 1;
  margin: 0 30px;
  text-align: center;
}

.chart-container {
  margin-top: 10px;
  position: relative;
  height: 400px;
  width: 100%;
}
</style>
