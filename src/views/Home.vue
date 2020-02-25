<template>
  <div class="home">
    <p class="ctr"><img
        alt="roo logo"
        src="../assets/roo.png"
        style="border-radius: 500px;"
      ></p>
    <br>
    <h1>Select a restaurant (loaded from server)</h1>
    <div class="vendors">
      <b-card
        class="mb-4"
        v-for="vendor in vendors"
        v-bind:key="vendor.vendor_id"
        v-bind:title="vendor.business_name"
      >
        <b-card-text>Note: vendor selection does not work yet.</b-card-text>
        <a
          href="#"
          class="card-link"
        >A test link here</a>
        <b-link
          href="#"
          class="card-link"
        >Another link</b-link>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      vendors: []
    };
  },
  components: {},
  mounted() {
    this.fetchVendors();
  },
  methods: {
    fetchVendors() {
      axios
        .get("https://uwhuskyeats.herokuapp.com/vendors", {
          withCredentials: true
        })
        .then(response => {
          this.vendors = response.data;
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
.vendors {
  margin-top: 2.5rem;

}
</style>