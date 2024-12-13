// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';

import AllUsers from '../components/AllUsers.vue'; // Import AllUsers component

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/all-users', // Define the route for AllUsers
    name: 'AllUsers',
    component: AllUsers,
  },
  
];




const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
