<template>
  <div class="wallet">
    <h1>{{ business.business.business_name }}</h1>
    <h3>{{ business.business.business_desc }}</h3>

    <hr>
    <p>Available products:</p>
    <slot v-if="business.products.length === 0"><span style="opacity:.7">&bull; No products found</span></slot>
    <b-card v-else><b-table :fields="fields" :items="business.products">
	<template v-slot:cell(buy)="data">
            <router-link :to="`/purchase/${data.item.product_id}`">Buy product</router-link>
        </template>
    </b-table></b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BusinessDashboard",
  data() {
    return {
      fields: ['buy', 'item', 'cost'],
      business: {}, me: {}
    };
  },
  components: {},
  mounted() {
    this.fetchBiz();
  },
  methods: {
    fetchBiz() {
      axios
        .get(window.BASEURL + "vendors/" + this.$route.params.vendor_id, {
          withCredentials: true
        })
        .then(response => {
          this.business = response.data;
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
