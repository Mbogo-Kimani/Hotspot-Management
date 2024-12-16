<template>
  <div id="app" class="app-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="profile">
        <img src="https://via.placeholder.com/40" alt="User Avatar" class="avatar" />
        <div>
          <h4>Kim</h4>
          <p>Admin</p>
        </div>
        <div class="logout">
          <button @click="logout" class="logout-button">Logout</button>
          <img src="./assets/logout.png" alt="Logout Icon" class="logout-icon" />
        </div>
      </div>

      <!-- Navigation Menu -->
      <ul class="menu">
        <li :class="{ active: currentPage === 'dashboard' }" @click="navigateTo('dashboard')">
          Dashboard
        </li>
        <li>
          <details>
            <summary>Clients</summary>
            <ul>
              <li :class="{ active: currentPage === 'all-users' }" @click="navigateTo('all-users')" class="drop">
                All Users
              </li>
              <li :class="{ active: currentPage === 'ActiveUsers' }" @click="navigateTo('ActiveUsers')" class="drop">
                Active Users
              </li>
              <li :class="{ active: currentPage === 'AddClient' }" @click="navigateTo('AddClient')" class="drop">
                Add Client
              </li>
            </ul>
          </details>
        </li>
        <li :class="{ active: currentPage === 'Packages' }" @click="navigateTo('Packages')">Packages</li>
        <li :class="{ active: currentPage === 'Payments' }" @click="navigateTo('Payments')">Payments</li>
        <li :class="{ active: currentPage === 'Subscriptions' }" @click="navigateTo('Subscriptions')">Subscriptions</li>
        <li :class="{ active: currentPage === 'Daily Stats' }" @click="navigateTo('Daily Stats')">Daily Stats</li>
        <li :class="{ active: currentPage === 'Total Stats' }" @click="navigateTo('Total Stats')">Total Stats</li>
        <li :class="{ active: currentPage === 'Settings' }" @click="navigateTo('Settings')">Settings</li>
      </ul>
    </div>

    <!-- Router View for Page Content -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
  data() {
    return {
      currentPage: "", // Track the active page
    };
  },
  methods: {
    navigateTo(page: string) {
      this.currentPage = page; // Update active page
      this.$router.push(`/${page}`); // Navigate to the corresponding route
    },
    logout() {
      console.log("Logging out");
      this.$router.push("/"); // Redirect to the login page
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 90vh;
}

.sidebar {
  width: 250px;
  background-color: #007bff;
  color: white;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
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

 li {
  margin: 10px 0;
  padding: 8px 0;
  font-weight: bold;
  color: #f9f9f9;
  width: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

li:hover{
  background-color: #0032d4;
  padding: 12px;
  width: 100vh;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 1em;
 
}


li {
  cursor: pointer;
}

.logout {
  margin-top: -5px;
  text-align: center;
  margin-left: 40px;
}

.logout a {
  color: #f9f9f9;
  text-decoration: none;

}

.logout{
  width: 18px;
 
}

.logout2{
  width: 20px;
 
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  margin: 0;
  font-size: 2em;
}

.logout-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.logout-icon {
  margin-left: 10px;
  width: 20px;
}
</style>

