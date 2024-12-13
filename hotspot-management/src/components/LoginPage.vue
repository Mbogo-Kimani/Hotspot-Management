<template>
    <div class="login-container">
      <!-- Title of the login page -->
      <h2 class="login-title">Login</h2>
  
      <!-- Login form containing input fields and a button -->
      <el-form>
        <!-- Input field for the username -->
        <el-form-item>
          <el-input v-model="username" placeholder="Name" clearable></el-input>
        </el-form-item>
  
        <!-- Input field for the password, with a toggle to show/hide the password -->
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="Password" show-password clearable></el-input>
        </el-form-item>
  
        <!-- Button to trigger the login process -->
        <el-form-item>
          <el-button class="login-button" type="primary" @click="handleLogin">Login</el-button>
        </el-form-item>
      </el-form>
  
      <!-- Footer with a copyright notice -->
      <div class="footer">
        &copy; 2024 Hotspot Management
      </div>
    </div>
  </template>
  
  
  <script lang="ts">
  export default {
    data() {
      return {
        // Stores the entered username
        username: '',
  
        // Stores the entered password
        password: ''
      };
    },
    methods: {
      // Handles the login process when the button is clicked
      handleLogin() {
        if (this.username && this.password) {
          // If both fields are filled, log the entered credentials (this is just a placeholder)
          console.log('Logging in with', this.username, this.password);
        } else {
          // Notify the user if either field is empty
          console.log('Please enter both username and password');
        }
      }
    }
  };
  </script>
  
  <style>
  /* General body styling for full-screen centering and background color */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1a1a1a;
  }
  
  /* Styling for the login form container */
  .login-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
  }
  
  /* Title styling */
  .login-title {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  /* Spacing between form items */
  .el-form-item {
    margin-bottom: 1rem;
  }
  
  /* Styling for the login button */
  .login-button {
    width: 100%;
    background-color: #409EFF;
    color: white;
    font-weight: bold;
  }
  
  /* Hover effect for the login button */
  .login-button:hover {
    background-color: #66b1ff;
  }
  
  /* Footer styling */
  .footer {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #666;
  }
  </style>
  