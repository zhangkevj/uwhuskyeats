<template>
  <div class="wallet">
    <h1>Vendor management</h1>
    <p>Welcome to vendor management. You have access to these merchants:</p>
    <div>
      <div
        v-for="vendor in me"
        v-bind:key="vendor.vendor_id"
        class="white"
      >
        <h3>{{ vendor.business_name }}</h3>
        <BusinessTools :vid="vendor.vendor_id" :vname="vendor.business_name" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BusinessTools from "../components/BusinessTools.vue";

export default {
  name: "BusinessDashboard",
  data() {
    return {
      descModel: "",
      addItemModel: { name: "", price: 0.0 },
      me: []
    };
  },
  components: { BusinessTools },
  mounted() {
    if (this.$parent.user.account_type === "PERSONAL") {
      this.$router.push({ name: "Home" });
    }

    this.fetchMyBusinesses();
  },
  methods: {
    editDescription(vid) {
    },
    addProduct(vid) {
      this.addItemModel.price = parseFloat(this.addItemModel.price)
      console.log(`attempting to add ${this.addItemModel.name} for ${this.addItemModel.price} cost to vendor ${vid}`)
    },
    fetchMyBusinesses() {
      axios
        .get(window.BASEURL + "vendors/me", {
          withCredentials: true
        })
        .then(response => {
          this.me = response.data;
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
</style>
