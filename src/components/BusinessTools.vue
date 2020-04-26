<template>
<div>
<b-card :title="`Merchant tools for ${vname}`">
	<b-card-text>
		<h5>Description</h5>
                <textarea v-model="descModel" style="margin: 0; padding: 0; font-family: inherit; width: 100%; border: 1px solid #ccc; padding: 15px;"></textarea>
		<button v-on:click="saveDescription">&#x2714; Save</button>

		<hr>

		<h5>Add new product</h5>
		<input class="mtool" v-model="addItemModel.name" placeholder="Item name"> <input class="mtool" v-model="addItemModel.price" step="0.01" type="number" placeholder="1.00"> <button v-on:click="addProduct">+ Add product to storefront</button>

		<hr>

		<h5>Manage current products</h5>
		<b-table hover :items="me.products"></b-table>
	</b-card-text>
</b-card>
</div>
</template>
<script>
// This encapsulates merchant tools
import axios from "axios";
export default {
  name: "BusinessTools",
  props: ['vname', 'vid'], /* Vendor ID */
  data() {
    return {
      me: { products: [] },
      descModel: "",
      addItemModel: { name: "", price: 0.00 },
    };
  },
  components: {},
  mounted() {
    this.fetchThis();
  },
  methods: {
    saveDescription() {
      let model = this.descModel.trim()
      axios.post(window.BASEURL + `vendors/${this.vid}/description`, {"business_desc": model}, {
        withCredentials: true
      }).then(response => {
	if (response.data.error) { window.alert(response.data.error); return; }
        this.fetchThis();
      });      
    },
    addProduct() {
      this.addItemModel.price = parseFloat(this.addItemModel.price)
      console.log(`attempting to add ${this.addItemModel.name} for ${this.addItemModel.price} cost`)
      axios.post(window.BASEURL + `vendors/${this.vid}/products`, {"item": this.addItemModel.name, "price": this.addItemModel.price}, {
        withCredentials: true
      }).then(response => {
	if (response.data.error) { window.alert(response.data.error); return; }
        this.fetchThis();
      });
    },
    fetchThis() {
      axios
        .get(window.BASEURL + "vendors/" + this.vid, {
          withCredentials: true
        })
        .then(response => {
          this.me = response.data;
          this.descModel = response.data.business.business_desc;
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

.mtool { padding-left: 3px; padding-right: 3px; }
</style>
