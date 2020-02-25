<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand to="/">dawgfood</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="about">About</b-nav-item>

          <slot v-if="user.email && user.uid">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <span style="color: #FFF">Welcome back, {{ user.email }}</span>
              </template>
              <b-dropdown-item
                to="my-business"
                v-if="user.account_type === 'BUSINESS'"
              >Manage business</b-dropdown-item>
              <b-dropdown-item to="wallet">Wallet</b-dropdown-item>
              <b-dropdown-item @click="doLogout">Log out</b-dropdown-item>
            </b-nav-item-dropdown>
          </slot>
          <slot v-else>
            <b-nav-item to="login">Log in</b-nav-item>
            <b-nav-item to="register">Register</b-nav-item>
          </slot>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container apctr">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    if (
      this.$router.currentRoute.name !== "Login" &&
      this.$router.currentRoute.name !== "Register"
    ) {
      this.checkAuth(false);
    }
  },
  methods: {
    doLogout() {
      axios
        .post(
          "https://uwhuskyeats.herokuapp.com/auth/logout",
          { destroy: true },
          {
            withCredentials: true
          }
        )
        .then(response => {
          this.$router.push({ name: "Login" });
          this.user = {};
        });
    },
    checkAuth(redirectToHome) {
      axios
        .get("https://uwhuskyeats.herokuapp.com/auth/me", {
          withCredentials: true
        })
        .then(response => {
          let d = response.data;
          if (d.error) {
            this.$router.push({ name: "Login" });
          } else {
            this.user = response.data.user;
            if (redirectToHome) {
              this.$router.push({ name: "Home" });
            }
          }
        });
    }
  },
  components: {}
};
</script>

<style lang="scss">
.apctr {
  margin-top: 2.5rem;
}

#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
