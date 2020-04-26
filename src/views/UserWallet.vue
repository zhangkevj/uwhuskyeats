<template>
  <div class="wallet">
    <h2>My dogpurse</h2>
    <h1 class="balance">{{ balance.balance }}</h1>
    <b-form
      inline
      @submit="doDeposit"
    >
      <label
        class="sr-only"
        for="inline-form-input-email"
      >Email address</label>
      <b-input-group
        prepend="$"
        class="mb-2 mr-sm-2 mb-sm-0"
      >
        <b-input
          type="number"
          min="0.01"
          step="0.01"
          id="inline-form-input-email"
          placeholder="0.00"
          v-model="depositAmount"
        ></b-input>
      </b-input-group>
      <b-button
        variant="info"
        @click="doDeposit"
      >Deposit funds</b-button>
    </b-form>
    <br><br>
    <h2>My transactions</h2>
    <b-table
      striped
      hover
      :items="transactions"
      responsive="sm"
      small
      dark
    >
      <template v-slot:cell(txnid)="data">
        <span class="monospace">{{ data.value.substr(0, 8) }}</span>
      </template>
      <template v-slot:cell(timestamp)="data">
        {{ data.value | moment('from') }}
      </template>
      <template v-slot:cell()="data">
        {{ data.value }}
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserWallet",
  data() {
    return {
      balance: {},
      transactions: [],
      depositAmount: 0
    };
  },
  components: {},
  mounted() {
    this.fetchBalance();
    this.fetchTransactions();
  },
  methods: {
    doDeposit() {
      const params = new URLSearchParams();
      params.append("amount", parseFloat(this.depositAmount));
      axios
        .post(window.BASEURL + "wallet/deposit", params, {
          withCredentials: true
        })
        .then(response => {
          let d = response.data;
          if (d.error) {
            this.$alert(d.error, "Error", "error");
          } else {
            this.fetchTransactions();
            this.fetchBalance();
          }
        });
    },
    fetchTransactions() {
      axios
        .get(window.BASEURL + "wallet/txn", {
          withCredentials: true
        })
        .then(response => {
          this.transactions = response.data.transactions.reverse();
        });
    },
    fetchBalance() {
      axios
        .get(window.BASEURL + "wallet/balance", {
          withCredentials: true
        })
        .then(response => {
          this.balance = response.data;
        });
    }
  }
};
</script>
<style scoped>
div.home p.ctr,
.home {
  text-align: center;
}

h1.balance {
  font-size: 400%;
}

span.monospace {
  font-family: "Courier New", Courier, monospace;
  text-transform: uppercase;
}

span.monospace:before {
  content: "DOG-";
}
</style>
