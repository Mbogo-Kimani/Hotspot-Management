<template>
  <div class="real-time-stats">
    <div class="search-container">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date" v-model="startDate" />
      <label for="end-date">End Date:</label>
      <input type="date" id="end-date" v-model="endDate" />
      <button @click="filterByDate">Filter</button>
    </div>

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
  name: "RealTimeStatList",
  data() {
    return {
      realTimeStats: [],
      filteredStats: [],
      startDate: "",
      endDate: "",
      charts: {},
      chartConfigs: [
        { id: "activeUsersChart", title: "Active Users" },
        { id: "rxTxBitChart", title: "rxBit / txBit" },
      ]
    };
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    async fetchrealtimeStatList() {
      try {
        const token = "your_token_here"; // Replace with the actual token
        const requestBody = {
          pageNum: 1,
          pageSize: 3,
          beginAt: this.startDate
            ? this.formatDate(new Date(this.startDate))
            : "2024-01-01 00:00:00",
          endAt: this.endDate
            ? this.formatDate(new Date(this.endDate))
            : "2024-12-31 23:59:59",
        };

        const response = await axios.post("/admin/realtimeStatList", requestBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.data && Array.isArray(response.data.data.list)) {
          this.realTimeStats = response.data.data.list;
        } else {
          this.realTimeStats = [];
          console.error("Error: 'list' not found in response data.");
        }

        console.log("Fetched stats:", this.realTimeStats);
        this.filteredStats = this.realTimeStats;
        this.updateAllCharts();
      } catch (error) {
        console.error("Error fetching real-time stats:", error);
        alert("Failed to fetch real-time stats. Please try again later.");
      }
    },

    filterByDate() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate).setHours(0, 0, 0, 0);
        const end = new Date(this.endDate).setHours(23, 59, 59, 999);

        this.filteredStats = this.realTimeStats.filter((stat) => {
          const date = new Date(stat.statDate).getTime();
          return date >= start && date <= end;
        });
        this.updateAllCharts();
      }
    },

    updateAllCharts() {
      this.updateChart(
        "activeUsersChart",
        "Active Users",
        this.filteredStats.map((stat) => stat.activeUserCount),
        ["#007bff"]
      );
      this.updateChart(
        "rxTxBitChart",
        ["rxBit", "txBit"],
        [
          this.filteredStats.map((stat) => stat.rxBit || 0),
          this.filteredStats.map((stat) => stat.txBit || 0),
        ],
        ["#33ffbd", "#33a1ff"]
      );
    },

    updateChart(chartId, legends, dataSets, colors) {
      const labels = this.filteredStats.map((stat) => {
        if (stat.statDate) {
          const date = new Date(stat.statDate);
          return isNaN(date.getTime())
            ? "Invalid Date"
            : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
        return "No Date";
      });

      const datasets = Array.isArray(legends)
        ? legends.map((legend, index) => ({
            label: legend,
            data: dataSets[index],
            borderColor: colors[index],
            backgroundColor: `${colors[index]}33`,
            fill: true,
          }))
        : [
            {
              label: legends,
              data: dataSets,
              borderColor: colors[0],
              backgroundColor: `${colors[0]}33`,
              fill: true,
            },
          ];

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
            tooltip: {
              callbacks: {
                title: function (tooltipItems) {
                  try {
                    const timestamp = new Date(tooltipItems[0].label);
                    if (isNaN(timestamp)) {
                      return "Invalid Date";
                    }
                    const formattedDate = `${timestamp.getDate()}/${
                      timestamp.getMonth() + 1
                    }/${timestamp.getFullYear()}`;
                    const formattedTime = `${timestamp.getHours()}:${String(
                      timestamp.getMinutes()
                    ).padStart(2, "0")}:${String(
                      timestamp.getSeconds()
                    ).padStart(2, "0")}`;
                    return `Date: ${formattedDate} Time: ${formattedTime}`;
                  } catch {
                    return "Invalid Date";
                  }
                },
              },
            },
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
    this.fetchrealtimeStatList();
  },
};
</script>



  
  <style scoped>
  .real-time-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-left: 88px;
    width: 100%;
    height: 100%;
  }
  
  .search-container {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 230px;
    margin-top: 50px;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-left: 240px;
    margin-top: 120px;
  }
  
  .chart-container {
    position: relative;
    width: 90%;
    height: 300px;
  }
  </style>
  