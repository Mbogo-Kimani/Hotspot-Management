<template>
    <div class="add-client">
      <h1>Add Client</h1>

      <div class="card">
        <div class="form-container">
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="text" v-model="phone" placeholder="Enter Phone Number" />
          </div>
  
          <div class="form-group">
            <label for="package">Package</label>
            <select v-model="selectedPackage">
            <option value="Kumi Net">Kumi Net</option>   
            <option value="Mbao Net">Mbao Net</option>
            <option value="8-Hour Net">8-Hour Net</option>
            <option value="Weekly Net">Weekly Net</option>
            <option value="Monthly Net">Monthly Net</option>
              <option value="Family Net x3">Family Net x3</option>
              <option value="Family Net x4">Family Net x4</option>
              <option value="Family Net x5">Family Net x5</option>
              <option value="Family Net x6">Family Net x6</option>
              <option value="Qtrly Family Net x3">Qtrly Family Net x3</option>
              <option value="Qtrly Family Net x4">Qtrly Family Net x4</option>
              <option value="Qtrly Family Net x5">Qtrly Family Net x5</option>
              <option value="Qtrly Family Net x6">Qtrly Family Net x6</option>
            </select>
          </div>
  
          <button @click="addUser">Add User</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddClient",
    data() {
      return {
        phone: "",
        selectedPackage: "8-Hour Net",
      };
    },
    methods: {
      addUser() {
        // Generate next client ID based on the last one in the users array
        const lastClientId = this.$store.state.users.length
          ? this.$store.state.users[this.$store.state.users.length - 1].id
          : "#012";
        const newClientId = this.generateNextId(lastClientId);
  
        // Simulating random values for payment ID, MAC address, devices, and IP
        const newUser = {
          id: newClientId,
          phone: this.phone,
          package: this.selectedPackage,
          status: "Active",
          payment_id: `PAY${Math.floor(Math.random() * 1000000)}`,
          mac_address: `00:1B:44:11:3A:${Math.floor(Math.random() * 255)}`,
          devices: Math.floor(Math.random() * 6) + 1,
          ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
        };
  
        // Adding new user to All Users and Active Users pages
        this.$store.commit("addUser", newUser);
  
        // Redirect to All Users page after adding the user
        this.$router.push({ name: "AllUsers" });
      },
  
      generateNextId(lastId) {
        const lastNumber = parseInt(lastId.replace("#", ""));
        const nextNumber = lastNumber + 1;
        return `#${nextNumber.toString().padStart(3, "0")}`;
      },
    },
  };
  </script>
  
  <style scoped>
  
  h1 {
    color: #03259d;
    text-align: center;
    margin-left: 300px;
    margin-top:50px;

  }
  
  .card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 400px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 300px;
    height:50vh;
    margin-top: 30px;
    
    
    
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    padding: 50px;
    
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    
  }
  
  input,
  select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 2px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    border-color: #007BFF;
    margin-top:5px;
    
  }
  
  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  