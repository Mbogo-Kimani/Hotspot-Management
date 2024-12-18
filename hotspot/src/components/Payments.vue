<template>
    <div class="payments-page">
      <!-- Title -->
      <div class="header-container">
        <h2 class="title">Payments</h2>
      </div>
  
      <!-- Search Bar -->
      <div class="search-bar">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search Payments"
            @input="filterPayments"
          />
          <button>🔍</button>
        </div>
      </div>
  
      <!-- Table -->
      <div class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Payment_ID</th>
              <th>User_ID</th>
              <th>Product_ID</th>
              <th>Phone Number</th>
              <th>Amount(ksh)</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(payment, index) in filteredPayments" :key="index">
              <td>{{ payment.paymentId }}</td>
              <td>{{ payment.userId }}</td>
              <td>{{ payment.productId }}</td>
              <td>{{ payment.phoneNumber }}</td>
              <td>{{ payment.amount }}</td>
              <td>{{ payment.paymentDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      payments: [
        { paymentId: 'P001', userId: '#001', productId: 'HSP001', phoneNumber: '0748449048', amount: 10, paymentDate: '2024-12-10T12:30:00' },
        { paymentId: 'P002', userId: '#002', productId: 'HSP002', phoneNumber: '0701330765', amount: 20, paymentDate: '2024-07-11T08:15:00' },
        { paymentId: 'P003', userId: '#003', productId: 'HSP003', phoneNumber: '0748449048', amount: 50, paymentDate: '2024-01-10T15:45:00' },
        { paymentId: 'P004', userId: '#004', productId: 'HSP004', phoneNumber: '0701330765', amount: 380, paymentDate: '2024-12-20T10:00:00' },
        { paymentId: 'P005', userId: '#005', productId: 'HSP005', phoneNumber: '0748449048', amount: 1000, paymentDate: '2024-12-31T17:30:00' },
        { paymentId: 'P006', userId: '#006', productId: 'HSP006', phoneNumber: '0701330765', amount: 1300, paymentDate: '2024-10-07T09:00:00' },
        { paymentId: 'P007', userId: '#007', productId: 'HSP007', phoneNumber: '0748449048', amount: 1600, paymentDate: '2024-12-16T13:25:00' },
        { paymentId: 'P008', userId: '#008', productId: 'HSP008', phoneNumber: '0701330765', amount: 1800, paymentDate: '2024-11-10T11:00:00' },
        // more payment objects
      ],
      filteredPayments: []
    };
  },
  methods: {
    filterPayments() {
      // If the search query is empty, show all payments
      if (!this.searchQuery) {
        this.filteredPayments = this.payments;
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredPayments = this.payments.filter(payment => {
        return (
          payment.paymentId.toLowerCase().includes(query) ||
          payment.userId.toLowerCase().includes(query) ||
          payment.phoneNumber.includes(query) ||
          payment.paymentDate.includes(query)
        );
      });
    },
    formatDate(date) {
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      };
      const formattedDate = new Date(date).toLocaleString('en-GB', options);
      return formattedDate.replace(',', '');  // Remove comma between date and time
    }
  },
  mounted() {
    // Initially load all payments and format paymentDate
    this.filteredPayments = this.payments.map(payment => ({
      ...payment,
      paymentDate: this.formatDate(payment.paymentDate)
    }));
  }
};
</script>
 
  <style scoped>
  /* Header and Search */
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 20px;
  }
  
  .title {
    font-size: 1.5rem;
    color: #1d4ed8;
    font-weight: bold;
    margin-top:30px ;
    margin-left: -10px;
  }
  
  .search-bar {
  margin-top: -10px;  
  margin-bottom: 20px;
  margin-left: 10px;
}

.search-container {
  position: relative;
  display: inline-block;
  width: 50%;
}

.search-container input {
  width: 100%;
  padding: 8px 40px 8px 10px;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  border-color: #ffcf77;
}

.search-container button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #007bff;
}

  
   /* Table */
.table-container {
  overflow-x: auto;
  padding: 0 10px;
}

.custom-table {
  width: 100%; 
  border-collapse: collapse;
  text-align: center;
}

.custom-table th,
.custom-table td {
  padding: 8px;
  border: 1px solid #e5e7eb;
  word-wrap: break-word; /* Ensure content breaks inside cells */
}

.custom-table th {
  background-color: #3b82f6;
  color: white;
}

.custom-table th:nth-child(1),
.custom-table th:nth-child(2),
.custom-table th:nth-child(3),
.custom-table th:nth-child(4),
.custom-table th:nth-child(5),
.custom-table th:nth-child(6) {
  min-width: 120px;
}

.custom-table th:nth-child(1),
.custom-table td:nth-child(1) {
  width: 10%; /* Payment ID */
}

.custom-table th:nth-child(2),
.custom-table td:nth-child(2) {
  width: 12%; /* User ID */
}

.custom-table th:nth-child(3),
.custom-table td:nth-child(3) {
  width: 15%; /* Product ID */
}

.custom-table th:nth-child(4),
.custom-table td:nth-child(4) {
  width: 20%; /* Phone Number */
}

.custom-table th:nth-child(5),
.custom-table td:nth-child(5) {
  width: 10%; /* Amount */
}

.custom-table th:nth-child(6),
.custom-table td:nth-child(6) {
  width: 15%; /* Payment Date */
  white-space: nowrap; /* Prevents wrapping of the date and time */
}
  /* Status Colors */
  .status-paid {
    color: #22c55e; /* Green */
    font-weight: bold;
  }
  
  .status-pending {
    color: #f59e0b; /* Orange */
    font-weight: bold;
  }
  
  .status-overdue {
    color: #ef4444; /* Red */
    font-weight: bold;
  }
  </style>
  