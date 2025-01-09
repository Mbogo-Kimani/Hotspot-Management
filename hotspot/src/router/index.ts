// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import AllUsers from '../components/AllUsers.vue'; // Import AllUsers component

import DailyStat from '../components/DailyStat.vue'; // Import AllUsers component
import RealtimeStat from '../components/RealtimeStat.vue'; // Import AllUsers component
import LoginPage from '../components/LoginPage.vue'; // Import AllUsers component
import Payments from '../components/Payments.vue'; // Import AllUsers component
import type { RouteLocationNormalizedLoaded, NavigationGuardNext } from 'vue-router';


const routes = [
  {
    path: "/Login",
    name: "Login",
    component:LoginPage,
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to:RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
      console.log('Navigating to:', to.fullPath);
      const token = localStorage.getItem('token');
      if (!token) {
        next('/Login');  // Redirect to login if no token
      } else {
        next();  // Allow navigation to Dashboard
      }
    }
  
  },
  {
    path: '/AllUsers', // Define the route for AllUsers
    name: 'AllUsers',
    component: AllUsers,
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
    path: '/RealTimeStat', // Define the route for AllUsers
    name: 'RealtimeStat',
    component: RealtimeStat,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded, next) => {
  console.log('Navigating to:', to.fullPath);
  next(); // Proceed with navigation
});
export default router;
