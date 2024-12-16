import './assets/main.css';
import App from './App.vue';
import router from './router';
import "element-plus/dist/index.css";

// Import necessary functions from Vue and Pinia
import { createApp } from 'vue';
import { createPinia } from 'pinia';



// Create the Vue app instance
const app = createApp(App);


// Use Pinia for state management
app.use(createPinia());

// Use Vue Router for routing
app.use(router);

// Mount the app to the DOM
app.mount('#app');
