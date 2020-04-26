<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <h2>Buying item from <em>{{ business.business_name }}</em></h2>
    <h3>{{ business.business_desc }}</h3>
    <b-card :title="product.product_name"><b-card-text>{{ product.product_price }}</b-card-text></b-card>
    <b-btn v-bind:disabled="product && product.product_name && product.product_name.length == 0" variant="primary" style="margin-top: 15px" v-on:click="checkout">Purchase</b-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CheckoutPage",
  data() {
    return {
      fields: ['buy', 'item', 'cost'],
      me: {},
      product: {},
      business: {},
    };
  },
  components: {},
  mounted() {
    this.fetchItem()
  },
  methods: {
    checkout() {
      axios
        .post(window.BASEURL + "wallet/pay", {product_id: this.$route.params.product_id}, {
          withCredentials: true
        })
        .then(response => {
          if (response.data.error) { this.$alert(response.data.error, "Error", 'error'); } else {
		console.log(response.data)
                if (response.data.success) { this.$alert("Paid successfully! Check your Wallet balance now!", "Paid", 'success'); }
          }
        });
    },
    fetchItem() {
      axios
        .get(window.BASEURL + "products/by-id/" + this.$route.params.product_id, {
          withCredentials: true
        })
        .then(response => {
          this.product = response.data.product;
          if (this.product.vendor_id) { 
            this.fetchBiz(this.product.vendor_id)
          }
        });
    },
    fetchBiz(id) {
      axios
        .get(window.BASEURL + "vendors/" + id, {
          withCredentials: true
        })
        .then(response => {
          this.business = response.data.business;
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

.white {
  color: #fff;
}
</style>
