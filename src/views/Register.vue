<template>
  <div class="register">
    <h1>Register or <router-link :to="{name: 'Login'}" class="header-link">log in</router-link>
    </h1>
    <p>You can register a new account here. New personal users get a $5 signup bonus.</p>

    <b-form
      @submit="doRegister"
    >
      <label
        class="sr-only"
        for="inline-form-input-email"
      >Email address</label>
      <b-input-group class="mb-4">
        <b-form-select
          id="input-3"
          v-model="account_type"
          :options="{ 'PERSONAL': 'Personal account', 'BUSINESS': 'Business account' }"
          required
        ></b-form-select>
      </b-input-group>

      <label
        class="sr-only"
        for="inline-form-input-email"
      >Email address</label>
      <b-input-group class="mb-4">
        <b-input
          id="inline-form-input-email"
          placeholder="Email address"
          v-model="email"
        ></b-input>
      </b-input-group>

      <label
        class="sr-only"
        for="inline-form-input-name"
      >Your name</label>
      <b-input-group class="mb-4">
        <b-input
          id="inline-form-input-name"
          placeholder="Your name"
          v-model="name"
        ></b-input>
      </b-input-group>

      <slot v-if="account_type === 'BUSINESS'">
        <label
          class="sr-only"
          for="inline-form-input-bizname"
        >Business name</label>
        <b-input-group class="mb-4">
          <b-input
            id="inline-form-input-bizname"
            placeholder="Business name (this is what will show up on the front page)"
            v-model="bizName"
          ></b-input>
        </b-input-group>
      </slot>

      <label
        class="sr-only"
        for="inline-form-input-password"
      >Password</label>
      <b-input-group class="mb-4">
        <b-input
          id="inline-form-input-password"
          placeholder="Password"
          type="password"
          v-model="pass"
        ></b-input>
      </b-input-group>

      <b-button
        variant="primary"
        @click="doRegister"
      >Register</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default {
  name: "Register",
  mounted() {},
  data: function() {
    return {
      account_type: "PERSONAL",
      email: "",
      name: "",
      bizName: "",
      pass: ""
    };
  },
  methods: {
    doRegister() {
      const params = new URLSearchParams();
      params.append("email", this.email);
      params.append("account_type", this.account_type);
      params.append("name", this.name);
      params.append("password", this.pass);
      if (this.bizName) {
        params.append("business_name", this.bizName);
      }

      axios
        .post(window.BASEURL + "auth/register", params, {
          withCredentials: true
        })
        .then(response => {
          let d = response.data;
          if (d.error) {
            this.$alert(d.error, "Error", "error");
          } else {
            this.$parent.checkAuth(true);
          }
        });
    }
  },
  components: {}
};
</script>
