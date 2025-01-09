import './assets/main.css';
import App from './App.vue';
import router from './router/index';
import "element-plus/dist/index.css";
import axios from 'axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(App);

// Add token to localStorage (replace 'your-access-token-here' with the actual token)
localStorage.setItem('token', "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldG5ldCIsImlhdCI6MTczNjIzODQwMiwiZXhwIjoxNzM2MjUyODAyfQ.K453uduWFgu_cC8lcfoHHpyxwH6uh9XYdXZO_PrlRRU");

// Set up Axios to include the token globally
axios.defaults.baseURL = 'https://test.api.hotspot.etnet.co.ke'; // Replace with your API's base URL
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Attach Vue plugins
app.use(createPinia());
app.use(router);

// Mount the app
app.mount('#app');