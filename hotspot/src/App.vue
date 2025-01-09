<template>
  <div id="app" class="app-container">
    <!-- Conditionally render the sidebar -->
    <div v-if="showSidebar" class="sidebar">
      <div class="profile">
        <div>
          <img src="https://img.icons8.com/?size=100&id=23244&format=png&color=000000" alt="Profile Picture" class="profile-photo">
          <h4>{{ userName }}</h4>
        </div>
        <div class="logout">
          <button @click="logout" class="logout-button">Logout</button>
          <img @click="logout" src="./assets/logout.png" alt="Logout Icon" class="logout-icon" />
        </div>
      </div>
      <ul class="menu">
        <li
          :class="{ active: currentPage === 'Dashboard' }"
          @click="navigateTo('Dashboard')"
        >
          Dashboard
        </li>
        <li
          :class="{ active: currentPage === 'DailyStat' }"
          @click="navigateTo('DailyStat')"
        >
          Daily Stat
        </li>
        <li
          :class="{ active: currentPage === 'RealTimeStat' }"
          @click="navigateTo('RealTimeStat')"
        >
          Real Time Stat
        </li>
        <li
          :class="{ active: currentPage === 'AllUsers' }"
          @click="navigateTo('AllUsers')"
        >
          All Users
        </li>
        <li
          :class="{ active: currentPage === 'Payments' }"
          @click="navigateTo('Payments')"
        >
          Payments
        </li>
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
      currentPage: localStorage.getItem("currentPage") || "Dashboard",
      userName: "Loading...", // Default value before fetching the user's name
    };
  },
  computed: {
    // Compute whether the sidebar should be shown
    showSidebar() {
      // List of routes where the sidebar should be hidden
      const noSidebarRoutes = ["Login"];
      return !noSidebarRoutes.includes(this.$route.name);
    },
  },
  methods: {
    navigateTo(page: string) {
      this.currentPage = page;
      localStorage.setItem("currentPage", page); // Persist the active page
      this.$router.push(`/${page}`); // Navigate using Vue Router
    },
    logout() {
      console.log("Logging out");
      localStorage.clear(); // Clear local storage or session storage
      this.$router.push("/Login"); // Redirect to the login page
    },
    fetchUserName() {
      // Simulate fetching the user's name from a backend or global state
      // Replace this with actual API calls or Vuex logic
      const storedUser = localStorage.getItem("userName");
      this.userName = storedUser ? storedUser : "Guest";
    },
  },
  mounted() {
    // Fetch the user's name when the app is loaded
    this.fetchUserName();
  },
  watch: {
    // Watch for route changes and update the active page
    $route(to) {
      this.currentPage = to.name;
      localStorage.setItem("currentPage", to.name);
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  margin-right: 50px;
  width: 100%;
 
}

.sidebar {
  width: 250px;
  background-color: #007bff;
  color: white;
  height: 100%;
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

h4 {
  margin: 0;
  font-size: 1.2em;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  transition: background-color 0.3s;
}

.menu li:hover {
  background-color: #0032d4;
  width: 100%;
}

.menu li.active {
  background-color: #0032d4;
  width: 100%;
}

.logout {
 
  display: flex;
  align-items: center;
  margin-top: 14px;
  margin-left: 80px;
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
  cursor: pointer;
}

.profile-photo{
  width: 45px;
  border-radius: 24px;
}
</style>
