<template>
  <div class="users-container">
    <!-- Search Bar -->
    <div class="user-bar">
      <div class="list-container">
        <table class="list-table">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  v-model="searchInputs.name"
                  placeholder="Name"
                  class="list-input"
                  @keypress.enter="searchUsers"
                />
              </td>
              <td>
                <input
                  type="text"
                  v-model="searchInputs.phoneNumber"
                  placeholder="Phone Number"
                  class="list-input"
                  @keypress.enter="searchUsers"
                />
              </td>
              <td>
                <input
                  type="date"
                  v-model="searchInputs.beginAt"
                  class="list-input"
                  @keypress.enter="searchUsers"
                />
              </td>
              <td>
                <input
                  type="date"
                  v-model="searchInputs.endAt"
                  class="list-input"
                  @keypress.enter="searchUsers"
                />
              </td>
              <td class="button-cell">
                <button @click="searchUsers" class="list-button">🔍</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="stats-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Sync Mkt</th>
            <th>Sync Mkt Error</th>
            <th>Last Login</th>
            <th>Create At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.name}}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.email }}</td>
            <td>{{ getSyncMktText(user.syncMkt) }}</td>
            <td>{{ user.syncMktError}}</td>
            <td>{{ formatDate(user.lastLoginAt) }}</td>
            <td>{{ formatDate(user.createAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userList: [], // List of users to display in the table
      searchInputs: {
        name: "", // User's name
        phoneNumber: "", // User's phone number
        beginAt: "", // Start date for filtering
        endAt: "", // End date for filtering
      },
    };
  },
  methods: {
    // Format date to "YYYY-MM-DD HH:mm:ss"
    formatDate(date) {
      if (!date) return "N/A"; // Return 'N/A' if the date is null or undefined
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return new Date(date).toLocaleString(undefined, options);
    },

    // Convert syncMkt status to readable text
    getSyncMktText(syncMkt) {
      const statusMap = {
        0: "No",
        1: "Yes",
        2: "Failed",
      };
      return statusMap[syncMkt] || "Unknown";
    },

    // Fetch users from the API
    async searchUsers() {
      const apiUrl = "https://test.api.hotspot.etnet.co.ke/admin/userList";

      // Prepare the request body
      const requestBody = {
        pageNum: 1,
        pageSize: 10,
        name: this.searchInputs.name || null, // Include name if entered
        phoneNumber: this.searchInputs.phoneNumber || null, // Include phoneNumber if entered
        beginAt: this.searchInputs.beginAt
          ? `${this.searchInputs.beginAt} 00:00:00`
          : "2025-01-01 00:00:00",
        endAt: this.searchInputs.endAt
          ? `${this.searchInputs.endAt} 23:59:59`
          : "2025-12-31 23:59:59",
      };

      try {
        const response = await axios.post(apiUrl, requestBody);
        if (response.data && response.data.code === 0) {
          // Update the userList with the API response
          this.userList = response.data.data?.list || [];
        } else {
          console.error("Error fetching users:", response.data?.message || "Unknown error");
          alert("Failed to fetch users. Please try again.");
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("An error occurred while fetching data.");
      }
    },
  },
  mounted() {
    // Fetch users on initial load
    this.searchUsers();
  },
};
</script>



<style>
.user-bar {
  margin-top: 10px;
  width: 70%;
  margin-left:300px;
}

.list-container {
  display: flex; /* Use flexbox to align items properly */
  justify-content: space-between; /* Spread inputs and button */
  flex-wrap: wrap; /* Ensure items wrap on smaller screens */
}

.list-table td {
  padding: 6px;
  text-align: left;
  border: none; /* Removed borders around table cells */
}

.list-input {
  width: 79%; /* Increased width for larger input boxes */
  padding: 10px; /* Increased padding for more height */
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-top: 20px;
  
}

.list-button {
  padding: 10px 12px;
  background-color: #d1e7fd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1px;
  margin-right: -40px;
}

.list-button:hover {
  background-color:#007bff;
}


.table-wrapper {
  max-height: 500px; /* Limit table height */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: auto; /* Enable horizontal scrolling */
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 80%;
  margin-left:300px;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
}

.stats-table th,
.stats-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.stats-table th {
  background-color: #007bff;
  color:#ffff;
  text-align:center;

}
</style>
