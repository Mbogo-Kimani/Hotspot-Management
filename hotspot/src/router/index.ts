// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import AllUsers from '../components/AllUsers.vue'; // Import AllUsers component
import Packages from '../components/Packages.vue'; // Import AllUsers component
import Payments from '../components/Packages.vue'; // Import AllUsers component
import DailyStat from '../components/DailyStat.vue'; // Import AllUsers component
import RealtimeStat from '../components/RealtimeStat.vue'; // Import AllUsers component


const routes = [
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/AllUsers', // Define the route for AllUsers
    name: 'AllUsers',
    component: AllUsers,
  },
 
  
  {
    path: '/Packages', // Define the route for AllUsers
    name: 'Packages',
    component: Packages,
  },
  {
    path: '/Payments', // Define the route for AllUsers
    name: 'Payments',
    component: Payments,
  },
  {
    path: '/DailyStat', // Define the route for AllUsers
    name: 'DailyStat',
    component: DailyStat,
  },
  {
    path: '/RealtimeStat', // Define the route for AllUsers
    name: 'RealtimeStat',
    component: RealtimeStat,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
