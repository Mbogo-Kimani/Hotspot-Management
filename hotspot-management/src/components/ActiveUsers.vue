<template>
    <div class="active-users">
      <h1>Active Users</h1>
      <div class="search-bar">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search User"
            @input="filterUsers"
          />
          <button>🔍</button>
        </div>
      </div>
      <table class="users-table">
        <thead>
          <tr>
            <th>Clients</th>
            <th>Phone Number</th>
            <th>Packages</th>
            <th>Status</th>
            <th>Payment ID</th>
            <th>MAC Address</th>
            <th>Devices</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.package }}</td>
            <!-- Conditional class binding for status -->
            <td :class="user.status === 'Active' ? 'status-active' : 'status-inactive'">
              {{ user.status }}
            </td>
            <td>{{ user.payment_id }}</td>
            <td>{{ user.mac_address }}</td>
            <td>{{ user.devices }}</td>
            <td>{{ user.ip_address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "ActiveUsers",
    data() {
      return {
        searchQuery: "",
        users: [
          {
            id: "#001",
            phone: "+254 748449048",
            package: "Mbao Net",
            status: "Active",
            payment_id: "PAY123456",
            mac_address: "00:1B:44:11:3A:B7",
            devices: "1",
            ip_address: "192.168.1.10",
          },
        
          {
            id: "#003",
            phone: "+254 748449048",
            package: "Weekly Net",
            status: "Active",
            payment_id: "PAY123458",
            mac_address: "00:1B:44:11:3A:B9",
            devices: "2",
            ip_address: "192.168.1.12",
          },
         
          {
            id: "#005",
            phone: "+254 748449048",
            package: "Family Net x3",
            status: "Active",
            payment_id: "PAY123460",
            mac_address: "00:1B:44:11:3A:BB",
            devices: "3",
            ip_address: "192.168.1.14",
          },
         
          {
            id: "#007",
            phone: "+254 748449048",
            package: "Family Net x5",
            status: "Active",
            payment_id: "PAY123456",
            mac_address: "00:1B:44:11:3A:B7",
            devices: "4",
            ip_address: "192.168.1.10",
          },
        
          {
            id: "#009",
            phone: "+254 748449048",
            package: "Qtrly Family Net x3",
            status: "Active",
            payment_id: "PAY123458",
            mac_address: "00:1B:44:11:3A:B9",
            devices: "2",
            ip_address: "192.168.1.12",
          },
         
          {
            id: "#011",
            phone: "+254 748449048",
            package: "Qtrly Family Net x5",
            status: "Active",
            payment_id: "PAY123460",
            mac_address: "00:1B:44:11:3A:BB",
            devices: "4",
            ip_address: "192.168.1.14",
          },
       
          {
            id: "#013",
            phone: "+254 748449048",
            package: "8-Hour Net",
            status: "Active",
            payment_id: "PAY123460",
            mac_address: "00:1B:44:11:3A:BB",
            devices: "1",
            ip_address: "192.168.1.14",
          },
        ],
        filteredUsers: [],
      };
    },
    methods: {
      filterUsers() {
        const query = this.searchQuery.trim().toLowerCase(); // Trim spaces and convert to lowercase
        if (query === "") {
          this.filteredUsers = this.users; // Show all users if the query is empty
          return;
        }
        this.filteredUsers = this.users.filter((user) => {
          const isMatch =
            user.id.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query) ||
            user.package.toLowerCase().includes(query) ||
            user.status.toLowerCase().includes(query) ||
            user.payment_id.toLowerCase().includes(query) ||
            user.mac_address.toLowerCase().includes(query) ||
            user.devices.toLowerCase().includes(query) ||
            user.ip_address.toLowerCase().includes(query);
  
          return isMatch;
        });
      },
    },
    created() {
      this.filteredUsers = this.users; // Initially show all users
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #03259d;
  }
  
  .active-users {
    padding: 20px;
    width: 90%;
    margin: 0 auto;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-container {
    position: relative;
    display: inline-block;
    width: 50%;
  }
  
  .search-container input {
    width: 100%;
    padding: 8px 40px 8px 10px;
    font-size: 14px;
    border: 2px solid #ddd;
    border-radius: 10px;
    box-sizing: border-box;
    border-color: #ffcf77;
  }
  
  .search-container button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    color: #007bff;
  }
  
  .users-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .users-table th,
  .users-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .users-table th {
    background-color: #007bff;
    color: white;
  }
  
  /* Status colors */
  .status-active {
    color: green;
    font-weight: bold;
  }
  

  </style>