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
  
      <!-- Data Table -->
      <div class="table-wrapper">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Revenue</th>
              <th>New Users</th>
              <th>Active Users (Min/Max)</th>
              <th>Successful Calls</th>
              <th>Failed Calls</th>
              <th>Successful Payments</th>
              <th>Failed Payments</th>
              <th>Data Usage (Min/Max)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stat, index) in filteredStats" :key="index">
              <td>{{ stat.id }}</td>
              <!-- Format the statDate using the formatDate method -->
              <td>{{ formatDate(stat.statDate) }}</td>
              <td>{{ stat.revenue }}</td>
              <td>{{ stat.newUserCount }}</td>
              <td>{{ stat.activeUserCountMin }} / {{ stat.activeUserCountMax }}</td>
              <td>{{ stat.subCallSuccCount }}</td>
              <td>{{ stat.subCallFailedCount }}</td>
              <td>{{ stat.subPaidSuccCount }}</td>
              <td>{{ stat.subPayFailedCount }}</td>
              <td>{{ stat.dataMin }} / {{ stat.dataMax }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
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
    font-family: Arial, sans-serif;
    width: 400vh;
   overflow-y: hidden;
   overflow-x: hidden;
   margin-left: 40px;
  }
  
  h1 {
    color: #007bff;
    text-align: center;
    margin-left: 60px;
  }
  
  .search {
    margin: 20px auto;
    text-align: center;
    margin-left: 60px;
  }
  
  .search input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .table-wrapper {
    max-height: 700px; /* Limit table height */
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: auto; /* Enable horizontal scrolling */
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 80%;
    
    margin-left: 250px;
  }
  
  .stats-table {
    width: 50%;
    border-collapse: collapse;
    margin-top: 20px;
    
  }
  
  .stats-table th,
  .stats-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    white-space: nowrap; /* Prevent text wrapping for horizontal scroll */
  }
  
  .stats-table th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }
  
  .stats-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .stats-table tr:hover {
    background-color: #d1e7fd;
  }
  </style>
  