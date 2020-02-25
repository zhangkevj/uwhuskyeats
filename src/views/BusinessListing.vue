<template>
  <div class="wallet">
    <h1>Vendor management</h1>
    <p>This page is a WIP.</p>
    <p>You have access to these vendor accounts:</p>
    <ul>
      <li
        v-for="vendor in me"
        v-bind:key="vendor.vendor_id"
        class="white"
      >
        {{ vendor.business_name }} </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BusinessDashboard",
  data() {
    return {
      me: []
    };
  },
  components: {},
  mounted() {
    if (this.$parent.user.account_type === "PERSONAL") {
      this.$router.push({ name: "Home" });
    }

    this.fetchMyBusinesses();
  },
  methods: {
    fetchMyBusinesses() {
      axios
        .get("https://uwhuskyeats.herokuapp.com/vendors/me", {
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

.white {
  color: #fff;
}
</style>