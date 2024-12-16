import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import AllUsers from "../components/AllUsers.vue"; // Placeholder for other components

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/all-users",
    name: "AllUsers",
    component: AllUsers,
  },
  {
    path: "/ActiveUsers",
    name: "ActiveUsers",
    component: () => import("../components/ActiveUsers.vue"), // Lazy load example
  },
  {
    path: "/AddClient",
    name: "AddClient",
    component: () => import("../components/AddClient.vue"),
  },
  {
    path: "/Packages",
    name: "Packages",
    component: () => import("../components/Packages.vue"),
  },
  {
    path: "/Payments",
    name: "Payments",
    component: () => import("../components/Payments.vue"),
  },
  {
    path: "/Settings",
    name: "Settings",
    component: () => import("../components/Settings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

