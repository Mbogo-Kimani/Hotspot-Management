<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="card-title">Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="name">User Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      name: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        // API Request
        const response = await axios.post("/admin/login", {
          name: this.name,
          password: this.password,
        });

        // Check success
        if (response.data && response.data.message === "success") {
          // Extract token and expiration from the response
          const token = response.data.data.token;  // Access token from 'data' object
          const expiration = response.data.data.expiration; // Access expiration from 'data' object
          
          // Check if token is present
          if (token) {
            // Store the token in localStorage
            localStorage.setItem("token", token);

            // Optionally, store the expiration time if needed
            localStorage.setItem("tokenExpiration", expiration);

            // Redirect to dashboard
            this.$router.push("/Dashboard");
          } else {
            this.error = "Login failed. No token received.";
          }
        } else {
          this.error = "Invalid Username or Password.";
        }
      } catch (err) {
        this.error = "An error occurred while logging in.";
        console.error(err.message);
      }
    },
  },
};
</script>


<style scoped>


.login-card {
  background-color:#fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for card effect */
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin-top: 120px;
  margin-left:450px;
}

.card-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>
