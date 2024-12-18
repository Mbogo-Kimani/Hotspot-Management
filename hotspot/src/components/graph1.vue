<template>
    <div class="daily-stat-container">
      <h1>Daily Statistics</h1>
      <!-- Date Search -->
      <div class="search">
        <input
          type="date"
          v-model="searchDate"
          @change="filterByDate"
          placeholder="Search by date"
        />
      </div>
  
      <!-- Line Graph -->
      <div class="chart-container">
        <canvas id="lineChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Chart from "chart.js/auto";
  
  export default {
    name: "DailyStat",
    data() {
      return {
        stats: [], // Holds all data from API
        filteredStats: [], // Filtered data for search
        searchDate: "", // Selected date for filtering
      };
    },
    methods: {
      // Fetch stats from API
      async fetchStats() {
        try {
          const response = await axios.get(
            "https://test.api.hotspot.etnet.co.ke/admin/dailyStatList"
          );
          console.log("API Response:", response);
          this.stats = response.data.data || []; // Access the array inside 'data'
          this.filteredStats = this.stats; // Set filtered stats to all stats initially
          this.updateChart(); // Update the chart with fetched data
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      },
  
      // Format timestamp to a readable string
      formatDate(date) {
        if (!date) return "N/A";
        return new Date(date).toLocaleString(); // Formats the date into a readable format
      },
  
      // Filter stats based on the selected date
      filterByDate() {
        if (this.searchDate) {
          this.filteredStats = this.stats.filter(
            (stat) => stat.statDate === this.searchDate
          );
        } else {
          this.filteredStats = this.stats; // Reset if no date selected
        }
        this.updateChart(); // Update the chart with filtered data
      },
  
      // Update the line chart with new data
      updateChart() {
        const labels = this.filteredStats.map((stat) => this.formatDate(stat.statDate));
        const revenueData = this.filteredStats.map((stat) => stat.revenue);
        const newUserData = this.filteredStats.map((stat) => stat.newUserCount);
  
        if (this.chart) {
          this.chart.destroy(); // Destroy the previous chart instance
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
                  label: (context) => {
                    const stat = this.filteredStats[context.dataIndex];
                    return [
                      `Revenue: $${stat.revenue}`,
                      `New Users: ${stat.newUserCount}`,
                      `Active Users: ${stat.activeUserCountMin}/${stat.activeUserCountMax}`,
                      `Successful Calls: ${stat.subCallSuccCount}`,
                      `Failed Calls: ${stat.subCallFailedCount}`,
                      `Successful Payments: ${stat.subPaidSuccCount}`,
                      `Failed Payments: ${stat.subPayFailedCount}`,
                      `Data Usage: ${stat.dataMin}/${stat.dataMax}`,
                    ];
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
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
    },
    mounted() {
      this.fetchStats(); // Fetch data on component load
    },
  };
  </script>
  
  <style scoped>
  .daily-stat-container {
    padding: 20px;
  }
  
  .search {
    margin-bottom: 20px;
  }
  
  .chart-container {
    margin-top: 30px;
    position: relative;
    height: 400px;
    width: 100%;
  }
  </style>
  