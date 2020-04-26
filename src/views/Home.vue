<template>
  <div class="home">
    <h1>SELECT A RESTAURANT</h1>
    <div class="vendors">
      <b-card
        class="mb-4"
        v-for="vendor in vendors"
        v-bind:key="vendor.vendor_id"
        v-bind:title="vendor.business_name"
      >
        <b-card-text>{{ vendor.business_desc }}</b-card-text>
        <router-link
          :to="`/merchants/${vendor.vendor_id}/storefront`"
          class="card-link"
        >Visit merchant</router-link>
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
        .get(window.BASEURL + "vendors", {
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
