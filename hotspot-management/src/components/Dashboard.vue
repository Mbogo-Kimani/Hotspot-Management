<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <div class="stats">
        <div class="stat-card active-clients">
          <img src="https://img.icons8.com/?size=60&id=0N99feShYSBW&format=png" alt="Users">
          <h3>ACTIVE CLIENTS</h3>
          <p class="clients">10,000</p>
        </div>
        <div class="stat-card total-revenue">
          <img src="https://img.icons8.com/?size=80&id=LFXbaiQfZuLS&format=png" alt="Total Revenue">
          <h3>TOTAL REVENUE</h3>
          <p class="revenue">Ksh 550,000</p>
        </div>
        <div class="stat-card payments-made">
          <img src="https://img.icons8.com/?size=80&id=DZMTS6QhaBfc&format=png" alt="Payments Made">
          <h3>PAYMENTS MADE</h3>
          <p class="payments">200,000</p>
        </div>
      </div>
      <div class="charts">
        <div class="chart monthly-revenue">
          <div class="chart-placeholder"></div>
          <h3>MONTHLY REVENUE</h3>
          <!-- Replace with your chart -->
        </div>
        <div class="chart customer-growth">
          <div class="chart-placeholder"></div>
          <h3>CUSTOMER GROWTH RATE</h3>
          <!-- Replace with your chart -->
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Dashboard",
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }

  .clients{
      color: #0077FF;
      font-weight: bold;
  }

.revenue{
  color: #EB7E03;
  font-weight: bold;
}

.payments{
  color:#FF0000;
  font-weight: bold;
}



  .stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    justify-content: center;
  }
  
  .stat-card {
    flex: 1;
    padding: 20px;
    margin: 0 50px;
    text-align: center;
    border-radius: 8px;
    color: white;
    justify-content: center;
  }
  
  .active-clients {
    background-color: #f8a541;
    color: #5D678A;
  }
  
  .total-revenue {
    background-color: #47d3f8;
    color: #5D678A;
  
  }
  
  .payments-made {
    background-color: #f8768e;
    color: #5D678A;
  }
  
  .charts {
    display: flex;
    justify-content: space-between;
  }
  
  .chart {
    flex: 1;
    margin: 0 30px;
    text-align: center;
  }
  
  .chart-placeholder {
    height: 200px;
    background-color: #f0f0f0;
    border-radius: 8px;
  }
  </style>
  