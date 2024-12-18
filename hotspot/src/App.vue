<template>
  <div id="app" class="app-container">
    <div class="sidebar">
      <div class="profile">
        <img src="https://via.placeholder.com/40" alt="User Avatar" class="avatar" />
        <div>
          <h4>Kim</h4>
          <p>Admin</p>
        </div>
        <div class="logout">
          <button @click="logout" class="logout-button">Logout</button>
          <img src="./assets/logout.png" alt="Logout Icon" class="logout-icon">
        </div>
      </div>
      <ul class="menu">
        <li>
          <details>
            <summary>Dashboard</summary>
            <ul>
              <li :class="{ active: currentPage === 'Dashboard' }" @click="navigateTo('Dashboard')" class="drop">Dashboard</li>
              <li :class="{ active: currentPage === 'DailyStat' }" @click="navigateTo('DailyStat')" class="drop">Daily Stat</li>
              <li :class="{ active: currentPage === 'Real-Time-Stat' }" @click="navigateTo('Real-Time-Stat')" class="drop">Real Time Stat</li>
             
            </ul>
          </details>
        </li>
        <li :class="{ active: currentPage === 'AllUsers' }" @click="navigateTo('AllUsers')">All Users</li>
        <li :class="{ active: currentPage === 'Packages' }" @click="navigateTo('Packages')">Packages</li>
        <li :class="{ active: currentPage === 'Payments' }" @click="navigateTo('Payments')">Payments</li>
        <li :class="{ active: currentPage === 'Settings' }" @click="navigateTo('Settings')">Settings</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script lang="ts">
export default {
  name: "App",
  data() {
    return {
      currentPage: '',
    };
  },
  methods: {
    navigateTo(page: string) {
      this.currentPage = page;
      this.$router.push(`/${page}`); // Navigate using Vue Router
    },
    logout() {
    console.log("Logging out");
    this.$router.push("/"); // Redirect to the login page or logout endpoint
  },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 180vh;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
 margin-right: 50px;
}

.sidebar {
  width: 250px;
  background-color: #007bff;
  color: white;
  height: 150vh;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

h4 {
  margin: 0;
  font-size: 1.2em;
}

p {
  margin: 0;
  font-size: 0.9em;
  color: #ddd;
}

.menu {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}

.menu li {
  margin: 10px 0;
  padding: 8px;
  font-weight: bold;
  color: #f9f9f9;
  cursor: pointer;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  transition: background-color 0.3s;
}

.menu li:hover {
  background-color: #0032d4;
  width: 100%;
}

.menu .drop:hover{
  background-color: #007bff;
}

.menu li.active {
  background-color: #0032d4;
  width: 100%;
}

.menu details summary {
  cursor: pointer;
}

.logout {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.logout-button {
  background: none;
  border: none;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

.logout-icon {
  margin-left: 10px;
  width: 20px;
}
</style>
