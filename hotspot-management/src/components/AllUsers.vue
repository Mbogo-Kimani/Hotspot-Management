<template>
    <div>
      <table class="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Payment ID</th>
            <th>Payment Phone Number</th>
            <th>MAC</th>
            <th>Devices</th>
            <th>Status</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user.user_id }}</td>
            <td>{{ user.product_id }}</td>
            <td>{{ user.payment_id }}</td>
            <td>{{ user.payment_phone_number }}</td>
            <td>{{ user.mac }}</td>
            <td>{{ user.devices }}</td>
            <td>{{ user.status }}</td>
            <td>{{ user.expiry }}</td>
            <td>
              <button @click="editUser(user)" class="action-button edit">✏️</button>
              <button @click="deleteUser(user.user_id)" class="action-button delete">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    name: 'UsersTable',
    data() {
      return {
        users: [],
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('https://test.api.hotspot.etnet.co.ke/admin/dailyStatList');
          this.users = response.data || [];
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      editUser(user) {
        console.log('Editing user:', user);
        // Implement edit functionality here
      },
      deleteUser(userId) {
        console.log('Deleting user with ID:', userId);
        // Implement delete functionality here
      },
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
  .users-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1em;
    text-align: left;
  }
  
  .users-table thead {
    background-color: #007bff;
    color: black;
  }
  
  .users-table th,
  .users-table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  .users-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .users-table tr:hover {
    background-color: #e9ecef;
  }
  
  .action-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    margin: 0 5px;
  }
  
  .action-button.edit {
    color: #007bff;
  }
  
  .action-button.delete {
    color: #dc3545;
  }
  </style>
  