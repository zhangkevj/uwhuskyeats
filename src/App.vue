<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="dark"
    >
      <b-navbar-brand to="/"><img src="./assets/row-text.png" width=20% id="row"><img src="./assets/logo-gold.png" width=15% id="logo"></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about">About</b-nav-item>

          <slot v-if="user.email && user.uid">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <span style="color: #FFF">Welcome back, {{ user.email }}</span>
              </template>
              <b-dropdown-item
                to="/my-business"
                v-if="user.account_type === 'BUSINESS'"
              >Manage business</b-dropdown-item>
              <b-dropdown-item to="/wallet">Wallet</b-dropdown-item>
              <b-dropdown-item @click="doLogout">Log out</b-dropdown-item>
            </b-nav-item-dropdown>
          </slot>
          <slot v-else>
            <b-nav-item to="/login">Log in</b-nav-item>
            <b-nav-item to="/register">Register</b-nav-item>
          </slot>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container apctr">
      <router-view />
    </div>
    <div id="footer">
      <img src="./assets/logo-gold.png" width=40px>
      <img src="./assets/row-text.png" height=20px id="row">
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
          window.BASEURL + "auth/logout",
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
        .get(window.BASEURL + "auth/me", {
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
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@900&family=Open+Sans:wght@400;700&display=swap');
@font-face {
    font-family: 'uni_sansbook';
    src: url('assets/fonts/UniSansBook.woff2') format('woff2'),
         url('assets/fonts/UniSansBook.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}
/* how to use fonts
font-family: 'Encode Sans', sans-serif; ALL CAPS, for headers
font-family: 'Open Sans', sans-serif; Normal or bold, for body text
font-family: 'UniSansBook', Arial, sans-serif;
*/

.apctr {
  margin-top: 2.5rem;
}

#app {
  font-family: 'Encode Sans', sans-serif;

  a {
    font-weight: bold;
    color: #b7a57a;

    &.dropdown-item.router-link-exact-active {
      background: #333; color: #ffffff;
    }
  }

  a:hover {
    color: #85754d;
    text-decoration: none;
  }
}

b-navbar {
  background-color: #4b2e83;
}

#row {
  display: block;
}

#logo {
  display: none;
}

@media (max-width: 640px) and (min-width: 320px){
  #row{
   display:none;
  }

  #logo{
   display:block;
  }
}

.header-link {
  font-family: 'Encode Sans', sans-serif;
  text-transform: uppercase;
}

#footer {
  text-align: center;
  position: relative;
  top: 150px;
  bottom: 0;
  width: 100%;
}

#footer img {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
