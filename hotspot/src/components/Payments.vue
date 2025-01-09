<template>
  <div class="payments-container">
    <div class="search-bar">
      <div class="search-container">
        <table class="search-table">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  v-model="searchInputs.mpesaReceiptNumber"
                  placeholder="Mpesa Receipt Number"
                  class="search-input"
                  @keypress.enter="searchPayments"
                />
              </td>
              <td> 
                <input
                  type="text"
                  v-model="searchInputs.phoneNumber"
                  placeholder="Phone Number"
                  class="search-input"
                  @keypress.enter="searchPayments"
                />
              </td>
              <td>
                <input
                  type="date"
                  v-model="searchInputs.beginAt"
                  class="search-input"
                  @keypress.enter="searchPayments"
                />
              </td>
              <td>
                <input
                  type="date"
                  v-model="searchInputs.endAt"
                  class="search-input"
                  @keypress.enter="searchPayments"
                />
              </td>
              <td class="button-cell">
                <button @click="searchPayments" class="search-button">🔍</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="stats-table">
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Amount</th>
            <th>Mpesa Receipt Number</th>
            <th>Transaction Date</th>
            <th>Status</th> 
            <th>Callback Error Msg</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in filteredPayments" :key="payment.id">
            <td>{{ payment.phoneNumber }}</td>
            <td>{{ payment.amount }}</td>
            <td>{{ payment.mpesaReceiptNumber }}</td>
            <td>{{ formatDate(payment.transactionDate) }}</td>
            <td>{{ statusLabels[payment.status] }}</td>
            <td>{{ payment.cbErrorMsg }}</td>
            <td>
              <button @click="showDetails(payment)">Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Details Table -->
    <div v-if="selectedPayment" class="details-table-container">
      <div class="details-header-container">
        <div class="details-header">More Information</div>
        <button @click="closeDetails" class="close-button">Close</button>
      </div>
      <div class="more-table-container">
        <table class="details-table">
          <tr>
            <th colspan="6" class="section-header">USER INFO</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>{{userInfo?.name}}</td>
            <td>Phone Number</td>
            <td>{{userInfo?.phoneNumber}}</td>
            <td>Email</td>
            <td>{{userInfo?.email}}</td>
          </tr>
          <tr>
            <td>Sync Mkt</td>
            <td>{{getSyncMktLabel(userInfo?.syncMkt)}}</td>
            <td>Sync Mkt Error</td>
            <td>{{userInfo?.syncMktError}}</td>
            <td>Last Login At</td>
            <td>{{userInfo?.lastLoginAt}}</td>
          </tr>
          <tr>
            <td>Create At</td>
            <td>{{userInfo?.createAt}}</td>
          </tr>

          <!-- Subscription Info Section -->
          <tr>
            <th colspan="6" class="section-header">SUBSCRIPTION INFO</th>
          </tr>
          <tr>
            <td>Profile Sync Mkt</td>
            <td>{{getProfileSyncMktLabel(subscriptionInfo?.profileSyncMkt)}}</td>
            <td>Profile Sync Mkt Error</td>
            <td>{{ subscriptionInfo?.profileSyncMktError}}</td>
            <td>Login Sync Mkt</td>
            <td>{{getLoginSyncMktLabel(subscriptionInfo?.loginSyncMkt)}}</td>
          </tr>
          <tr>
            <td>Login Sync Mkt Error</td>
            <td>{{subscriptionInfo?.loginSyncMkt}}</td>
            <td>Effective At</td>
            <td>{{ subscriptionInfo?.effectiveAt}}</td>
            <td>Expire At</td>
            <td>{{ subscriptionInfo?.expireAt}}</td>
          </tr>
          <tr>
            <td>Login At</td>
            <td>{{subscriptionInfo?.loginAt}}</td>
            <td>Mac</td>
            <td>{{subscriptionInfo?.mac}}</td>
            <td>IP</td>
            <td>{{subscriptionInfo?.ip}}</td>
          </tr>

          <tr>
            <th colspan="18">PRODUCT INFO</th>
          </tr>
          <tr>
            <td>Title</td>
            <td>{{productInfo?.title}}</td>
            <td>Quantity</td>
            <td>{{productInfo?.quantity}}</td>
            <td>Unit</td>
            <td>{{getUnitLabel(productInfo?.unit)}}</td>
          </tr>
          <tr>
            <td>Fee</td>
            <td>{{productInfo?.fee}}</td>
            <td>Description</td>
            <td>{{productInfo?.description}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchInputs: {
        mpesaReceiptNumber: "",
        phoneNumber: "",
        beginAt: "",
        endAt: "",
      },
      searchQuery: "",
      payments: [],
      filteredPayments: [], // Add this to store locally filtered results
      selectedPayment: null,
      userInfo: [],
      subscriptionInfo: [],
      productInfo: [],
      error: null, // For showing error messages
      statusLabels: {
        0: "Init",
        1: "Call Success",
        2: "Call Failed",
        3: "Payment Success",
        4: "Payment Failed",
      },
      requestBody: {
        pageNum: 1,
        pageSize: 10,
        beginAt: "2024-12-10 00:00:00",
        endAt: "2024-12-19 00:00:00",
      },
    };
  },
  computed: {
    filteredStats() {
      if (!this.searchQuery) return this.payments;
      const query = this.searchQuery.toLowerCase();
      return this.payments.filter(
        (payment) =>
          (payment.phoneNumber &&
            payment.phoneNumber.toLowerCase().includes(query)) ||
          (payment.mpesaReceiptNumber &&
            payment.mpesaReceiptNumber.toLowerCase().includes(query))
      );
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "N/A"; // Return 'N/A' if the date is null or undefined
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async fetchPayments() {
      try {
        const token = "your_token_here"; // Replace with your actual token
        console.log("Fetching payments with request body:", this.requestBody);

        const response = await axios.post("/admin/paymentList", this.requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response.data);

        if (response.data && response.data.data && Array.isArray(response.data.data.list)) {
          this.payments = response.data.data.list;
          this.filteredPayments = [...this.payments]; // Initialize filteredPayments
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);

        if (error.response) {
          console.error("Server responded with:", error.response.data);
          alert(`Failed to fetch payments: ${error.response.data.message || "Unknown error"}`);
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("Failed to fetch payments: No response from server.");
        } else {
          console.error("Error setting up request:", error.message);
          alert(`Failed to fetch payments: ${error.message}`);
        }
      }
    },
    async searchPayments() {
      const { mpesaReceiptNumber, phoneNumber, beginAt, endAt } = this.searchInputs;

      if (!mpesaReceiptNumber && !phoneNumber && !beginAt && !endAt) {
        alert("Please fill at least one field to search.");
        return;
      }

      const token = "your_token_here"; // Replace with your actual token

      // Filter payments locally based on input
      this.filteredPayments = this.payments.filter((payment) => {
        const matchesReceipt =
          !mpesaReceiptNumber ||
          payment.mpesaReceiptNumber.includes(mpesaReceiptNumber);
        const matchesPhone =
          !phoneNumber || payment.phoneNumber.includes(phoneNumber);
        const matchesBeginAt = !beginAt || new Date(payment.date).toDateString() >= new Date(beginAt).toDateString();
        const matchesEndAt = !endAt || new Date(payment.date).toDateString() <= new Date(endAt).toDateString();
        return matchesReceipt && matchesPhone && matchesBeginAt && matchesEndAt;
      });

      if (this.filteredPayments.length === 0) {
        alert("No matching payments found.");
      }
    },
    async showDetails(payment) {
      this.selectedPayment = payment;
      this.error = null; // Reset error message
      try {
        console.log("Fetching details for paymentId:", payment.id);

        const response = await axios.post("/admin/paymentExtInfo", {
          paymentId: 128,
        }, {
          headers: {
            Authorization: `Bearer your_token_here`, // Replace with your actual token
          }
        });

        if (response.data.code === 0) {
          const data = response.data.data || {};
          console.log("Details fetched:", data);

          this.userInfo = this.formatDates(data.user || []); // User details
          this.subscriptionInfo = this.formatDates(data.subscription || []); // Subscription details
          this.productInfo = this.formatDates(data.product || []); // Product details
        } else {
          console.warn("API Error:", response.data.message);
          this.error = response.data.message || "Unknown error from the server.";
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);

        if (error.response) {
          this.error = `Server Error: ${
            error.response.data.message || "Unknown error"
          }`;
        } else if (error.request) {
          this.error = "No response from the server. Please check your network.";
        } else {
          this.error = "Unexpected error occurred. Please try again.";
        }
      }
    },
    closeDetails() {
      this.selectedPayment = null;
      this.userInfo = [];
      this.subscriptionInfo = [];
      this.productInfo = [];
      this.error = null;
    },
    formatDates(data) {
      if (!data || typeof data !== "object") return data; 
      const formattedData = { ...data };
      for (const key in formattedData) {
        if (
          formattedData[key] &&
          typeof formattedData[key] === "string" &&
          formattedData[key].includes("T")
        ) {
          formattedData[key] = this.formatDate(formattedData[key]);
        }
      }
      return formattedData;
    },
    getSyncMktLabel(value) {
      const labels = { 0: "No", 1: "Yes", 2: "Failed" };
      return labels[value];
    },
    getUnitLabel(value) {
      const labels = { 1: "Hour", 2: "Day", 3: "Week", 4: "Month" };
      return labels[value];
    },
    getProfileSyncMktLabel(value) {
      const labels = { 0: "No", 1: "Yes", 2: "Failed" };
      return labels[value];
    },
    getLoginSyncMktLabel(value) {
      const labels = { 0: "No", 1: "Yes", 2: "Failed" };
      return labels[value];
    },
  },
  mounted() {
    this.fetchPayments();
  },
};
</script>

<style scoped>
.payments-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  width: 400vh;
  height: 90%;
 overflow-x: hidden;
 margin-left: 40px;

 
 margin-bottom: 30px;
}



.table-wrapper {
  max-height: 500px; /* Limit table height */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: auto; /* Enable horizontal scrolling */
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 80%;
  margin-left: 250px;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
}
  

.stats-table th,
.stats-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  white-space: nowrap; /* Prevent text wrapping for horizontal scroll */
}

.stats-table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.stats-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.stats-table tr:hover {
  background-color: #d1e7fd;
}

.details-table-container{
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  background-color: #f9f9f9;
  margin-left: 250px;
  margin-top:-165px;
  transform: translate(0.5%, 0.5%); 
  position: relative;
  
}

.details-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: sticky; 
  top: 0; /* Sticks to the top of the container */
  z-index: 100; /* Ensures it stays on top of the table */
}

.details-header {
  font-size: 1.5em;
  font-weight: bold;
  color: #aaaaaa;
  text-align: cen;
  
}

.close-button {
  position: fixed; /* Keeps the button fixed relative to the viewport */
  top: 10px; /* Adjust the top position */
  right: 10px; /* Adjust the right position */
  padding: 5px 10px;
  font-size: 0.9em;
  color: #fff;
  background: linear-gradient(90deg, #ff4d4d, #ff0000); /* Gradient background for appeal */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000; /* Ensures it appears above other elements */
  transition: all 0.3s ease; /* Smooth transition effect */
  display: flex;
  justify-content: left;
}

.close-button:hover {
  background: linear-gradient(90deg, #ff0000, #cc0000); /* Darker gradient on hover */
  transform: scale(1.05); /* Slightly enlarge button */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhance shadow on hover */
}

.more-table-container {
  overflow-x: auto;
  white-space: nowrap;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top:-5px;
}
.details-table th,
.details-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 0.9em;  
}
.details-table th {
  background-color: #d1e7fd;;
  color:#007bff;
  font-weight: bold;
  text-align: center;
}
.details-table td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.details-table tr:hover {
  background-color: #ebf3fc;
}


.details-table td {
  width: 150px; /* Set a fixed width */
  max-width: 150px; /* Prevent resizing */
  text-align: left; /* Align text to center */
  vertical-align: middle; /* Vertically align text */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Add ellipsis for overflow */
}


tbody tr td:nth-child(2n) {
  color: #555;
  font-size: 0.9em;
}

.section-header{
  text-align: center;
}

.search-bar {
  margin-top: 10px;
  width: 100%;
}

.search-container {
 
  display: flex; /* Use flexbox to align items properly */
  justify-content: space-between; /* Spread inputs and button */
  flex-wrap: wrap; /* Ensure items wrap on smaller screens */
  width: 100%;
}

.search-table {
  margin-left: 280px;
  padding: 6px;
  text-align: left;
  border: none; /* Removed borders around table cells */
}

.search-input {
  width: 79%; /* Ensures full width of the cell */
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
}

.search-button {
  padding: 5px 12px;
  background-color: #d1e7fd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
 
  margin-right: -40px;
}

.search-button:hover {
  background-color:#007bff;
}


</style>
