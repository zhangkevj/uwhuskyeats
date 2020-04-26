<template>
  <div class="login">
    <h1>Log in or <router-link :to="{name: 'Register'}" class="header-link">register</router-link></h1>
    <p>Authentication is required to continue.</p>

    <b-form
      inline
      @submit="doLogin"
    >
      <label
        class="sr-only"
        for="inline-form-input-email"
      >Email address</label>
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-email"
          placeholder="Email address"
          v-model="email"
        ></b-input>
      </b-input-group>

      <label
        class="sr-only"
        for="inline-form-input-password"
      >Password</label>
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-password"
          placeholder="Password"
          type="password"
          v-model="pass"
        ></b-input>
      </b-input-group>

      <b-button
        variant="primary"
        @click="doLogin"
      >Log in</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  name: "Login",
  mounted() {},
  data: function() {
    return {
      email: "",
      pass: ""
    };
  },
  methods: {
    doLogin() {
      const params = new URLSearchParams();
      params.append('email', this.email)
      params.append('password', this.pass)

      axios
        .post(window.BASEURL + "auth/login", params, { withCredentials: true })
        .then(response => {
          let d = response.data;
          if (d.error) {
            this.$alert(d.error, "Error", 'error');
          } else {
            this.$parent.checkAuth(true)
          }
        });
    }
  },
  components: {}
};
</script>
